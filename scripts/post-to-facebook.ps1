<#
.SYNOPSIS
Post a photo and caption to the SoCal Bobcat Facebook page.

.EXAMPLE
  .\scripts\post-to-facebook.ps1 -WhoAmI
  Check the token works and print the Page ID.

.EXAMPLE
  .\scripts\post-to-facebook.ps1 -Photo photos\saw-cutting-dock-doors.jpg -CaptionFile caption.txt -DryRun
  Show exactly what would be posted, without posting.

.EXAMPLE
  .\scripts\post-to-facebook.ps1 -Photo photos\saw-cutting-dock-doors.jpg -Caption "Saw work at a warehouse dock door."
  Post it for real.
#>
[CmdletBinding()]
param(
    [string]$Photo,
    [string]$Caption,
    [string]$CaptionFile,
    [switch]$DryRun,
    [switch]$WhoAmI
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$api  = 'https://graph.facebook.com/v21.0'

# --- load .env -------------------------------------------------------------
$envPath = Join-Path $root '.env'
if (-not (Test-Path $envPath)) {
    throw "No .env found at $envPath. Copy .env.example to .env and fill in FB_PAGE_TOKEN."
}
$config = @{}
foreach ($line in (Get-Content $envPath)) {
    if ($line -match '^\s*#' -or $line -notmatch '=') { continue }
    $k, $v = $line -split '=', 2
    $config[$k.Trim()] = $v.Trim()
}

$token = $config['FB_PAGE_TOKEN']
if (-not $token -or $token -like 'paste-*') {
    throw "FB_PAGE_TOKEN is not set in .env. Paste the long-lived Page token there."
}
$pageId = $config['FB_PAGE_ID']

# --- -WhoAmI: verify the token and list the pages it can post to -----------
if ($WhoAmI) {
    $me = Invoke-RestMethod "$api/me?fields=id,name&access_token=$token"
    Write-Output "Token belongs to: $($me.name)  (id $($me.id))"
    try {
        $accounts = Invoke-RestMethod "$api/me/accounts?fields=id,name,tasks,access_token&access_token=$token"
        if ($accounts.data) {
            Write-Output "`nPages this token can post to:"
            foreach ($p in $accounts.data) {
                $canPost = if ($p.tasks -contains 'CREATE_CONTENT') { 'can post' } else { 'CANNOT post' }
                Write-Output "`n  Name:   $($p.name)  [$canPost]"
                Write-Output "  ID:     $($p.id)"
                if ($p.access_token) {
                    Write-Output "  Token:  $($p.access_token)"
                }
            }
            Write-Output "`nPut that ID and Token into .env as FB_PAGE_ID and FB_PAGE_TOKEN."
            Write-Output "Page tokens derived from a long-lived user token do not expire. Treat it like a password."
        } else {
            Write-Output "`nNo pages returned. This is probably a User token, not a Page token."
        }
    } catch {
        Write-Output "`nCould not list pages (normal for a pure Page token). Current FB_PAGE_ID=$pageId"
    }
    return
}

# --- validate the post -----------------------------------------------------
if (-not $Photo)  { throw "Give me -Photo (e.g. photos\saw-cutting-dock-doors.jpg)." }
if (-not $pageId) { throw "FB_PAGE_ID is not set in .env. Run this script with -WhoAmI to find it." }

$photoPath = if ([System.IO.Path]::IsPathRooted($Photo)) { $Photo } else { Join-Path $root $Photo }
if (-not (Test-Path $photoPath)) { throw "Photo not found: $photoPath" }

if ($CaptionFile) {
    $capPath = if ([System.IO.Path]::IsPathRooted($CaptionFile)) { $CaptionFile } else { Join-Path $root $CaptionFile }
    if (-not (Test-Path $capPath)) { throw "Caption file not found: $capPath" }
    $Caption = (Get-Content $capPath -Raw).TrimEnd()
}
if (-not $Caption) { throw "Give me -Caption or -CaptionFile. Posting with no words is a waste of a post." }

$sizeMb = [math]::Round((Get-Item $photoPath).Length / 1MB, 2)

Write-Output "Page:    $pageId"
Write-Output "Photo:   $photoPath  ($sizeMb MB)"
Write-Output "Caption:"
Write-Output (($Caption -split "`n" | ForEach-Object { "  | $_" }) -join "`n")

if ($DryRun) {
    Write-Output "`n-DryRun set. Nothing was posted."
    return
}

# --- post ------------------------------------------------------------------
# curl.exe handles the multipart upload; PowerShell 5.1 cannot do it natively.
Write-Output "`nPosting..."
$response = & curl.exe -sS -X POST "$api/$pageId/photos" `
    -F "source=@$photoPath" `
    -F "message=$Caption" `
    -F "access_token=$token"

$result = $response | ConvertFrom-Json
if ($result.error) {
    Write-Output "FAILED: $($result.error.message)"
    if ($result.error.error_user_msg) { Write-Output "        $($result.error.error_user_msg)" }
    exit 1
}

Write-Output "Posted. photo id $($result.id)"
$link = if ($result.post_id) { $result.post_id } else { $result.id }
Write-Output "https://facebook.com/$link"
