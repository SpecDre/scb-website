# Letting Claude post to Facebook

One-time setup, maybe 15 minutes. After this, posting a photo is one command.

Everything on your side is done at **developers.facebook.com**, logged in with
the account that manages the SoCal Bobcat page. Meta moves their buttons around,
so the labels below may be slightly off — the shape of the flow is stable.

---

## 1. Make an app

1. Go to <https://developers.facebook.com/apps>
2. **Create App**
3. Use case: pick **Other**, then app type **Business**
4. Name it anything — `SCB Posting` is fine. Create it.

You never publish this app or submit it for review. It exists only to issue you
a token for your own page.

## 2. Get a user token

1. Go to <https://developers.facebook.com/tools/explorer> (Graph API Explorer)
2. Top right: select the app you just made
3. Click **Generate Access Token** and log in when it asks
4. In the permissions box, add these two:
   - `pages_manage_posts`
   - `pages_read_engagement`
5. Generate again so the permissions stick

This token is short-lived — about an hour. That's fine, it's a stepping stone.

## 3. Make it long-lived

1. Go to <https://developers.facebook.com/tools/debug/accesstoken>
2. Paste the token from step 2, click **Debug**
3. Click **Extend Access Token** at the bottom
4. Copy the new, longer token

## 4. Let the script find your page token

In the project root, copy `.env.example` to `.env` and put the step-3 token in
as `FB_PAGE_TOKEN`. Then run:

```powershell
.\scripts\post-to-facebook.ps1 -WhoAmI
```

It will print your page's **ID** and a **Page token**. Put both of those into
`.env`, replacing what's there. That page token does not expire.

Confirm it worked:

```powershell
.\scripts\post-to-facebook.ps1 -WhoAmI
```

You should see the page listed as `[can post]`.

---

## Posting

Check what would go out, without sending it:

```powershell
.\scripts\post-to-facebook.ps1 -Photo photos\saw-cutting-dock-doors.jpg -CaptionFile caption.txt -DryRun
```

Send it:

```powershell
.\scripts\post-to-facebook.ps1 -Photo photos\saw-cutting-dock-doors.jpg -CaptionFile caption.txt
```

`-Caption "some text"` works too if you'd rather not use a file.

---

## About the token

`.env` is gitignored, so the token stays on this machine and never reaches
GitHub. Anyone holding it can post as SoCal Bobcat, so don't paste it into
email or chat.

You have two computers. The token is not in git by design, so you'll need to
create `.env` separately on the other machine — same token, just copied over by
hand.

If it ever leaks: developers.facebook.com → your app → Settings → Advanced, or
just remove the app from your Facebook account's Business Integrations, and
every token it issued dies immediately.
