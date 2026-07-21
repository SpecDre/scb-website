/* ============================================================
   FORM HANDLING — contact.html, rate-card.html, careers.html

   Submissions POST to Formspree, which forwards them to the inbox
   configured for that form on the Formspree dashboard.

   EACH FORM'S DESTINATION IS ITS OWN action="..." ATTRIBUTE.
   That is the one place to change it. Bid requests and rate card
   requests go to one Formspree form; job applications go to a
   different one so they land in the dispatch inbox instead of
   estimating. To repoint a form, edit its action in the HTML —
   nothing in this file needs touching.

   The URLs are public form IDs, not secrets. They are meant to be
   visible in the page source; that is how Formspree works.

   The action attribute is also the no-JavaScript safety net. If
   this file fails to load, the browser posts the form natively to
   Formspree instead of doing nothing. Submissions still arrive;
   the visitor just lands on a Formspree page rather than staying
   on the site. That is the degraded path, not the normal one.

   If a form's action is missing or is not a Formspree URL, that
   form falls back to telling the visitor to call or email
   directly. Forms never fail silently the way they did before
   this file existed.

   Spam control: the _gotcha honeypot is Formspree's, and it lives
   in the HTML of each form. If it is ever not enough, turn on
   reCAPTCHA in the Formspree dashboard.
   ============================================================ */

/* Used only if a form somehow has no action of its own. */
var FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgogyorn';


/* ---- nothing below here needs editing ---- */

(function () {
  'use strict';

  // Fallback wording when we can't send. Kept identical to the real contact
  // details elsewhere on the site — update both if these ever change.
  var PHONE = '714-787-9970';
  var PHONE_HREF = 'tel:7147879970';
  var ESTIMATING = 'socalbobcatestimating@yahoo.com';

  function fallbackHTML(lead) {
    return lead +
      ' Call <a href="' + PHONE_HREF + '">' + PHONE + '</a>' +
      ' or email <a href="mailto:' + ESTIMATING + '">' + ESTIMATING + '</a>' +
      ' and we\'ll pick it up from there.';
  }

  function setStatus(el, kind, html) {
    el.className = 'formstatus is-' + kind;
    el.innerHTML = html;
  }

  function wire(form) {
    var button = form.querySelector('button[type=submit]');
    var label = button ? button.textContent : 'Send';

    // Each form carries its own destination. Fall back to the shared endpoint
    // only if the action is missing entirely.
    var endpoint = form.getAttribute('action') || FORMSPREE_ENDPOINT;
    var configured = endpoint.indexOf('formspree.io') !== -1;

    // Status region. aria-live so screen readers announce the result, which
    // matters here because on success the form itself is removed.
    var status = document.createElement('div');
    status.className = 'formstatus';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);

    // Honeypot lives in the HTML (see the .hp input in the form markup) so it
    // works even when this file doesn't load.
    var trap = form.querySelector('input[name="_gotcha"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (trap && trap.value) return; // bot

      if (!configured) {
        setStatus(status, 'error', fallbackHTML(
          '<strong>This form isn\'t connected yet.</strong> Nothing was sent.'
        ));
        return;
      }

      // Native validation first, so required fields behave as expected.
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;

      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }
      setStatus(status, 'pending', 'Sending…');

      fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          // Replace the form outright — a cleared form looks like it failed.
          var done = document.createElement('div');
          done.className = 'formstatus is-ok';
          done.setAttribute('role', 'status');
          // A form can override the confirmation wording with data-done —
          // "your request is in" is wrong for a job application.
          done.innerHTML = (form.getAttribute('data-done') ||
            '<strong>Got it — your request is in.</strong> ' +
            'We read these during business hours and reply by email.') +
            ' If it\'s urgent or off-hours, call <a href="' + PHONE_HREF + '">' + PHONE + '</a>.';
          form.parentNode.replaceChild(done, form);
        })
        .catch(function () {
          if (button) {
            button.disabled = false;
            button.textContent = label;
          }
          setStatus(status, 'error', fallbackHTML(
            '<strong>That didn\'t go through.</strong> Your request was not sent.'
          ));
        });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var forms = document.querySelectorAll('form[data-form]');
    for (var i = 0; i < forms.length; i++) wire(forms[i]);
  });
})();
