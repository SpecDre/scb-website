/* ============================================================
   FORM HANDLING — contact.html, rate-card.html, careers.html

   Submissions POST to Formspree, which forwards them to the inbox
   configured for that form on the Formspree dashboard.

   EACH FORM'S DESTINATION IS ITS OWN action="..." ATTRIBUTE.
   That is the one place to change it. To repoint a form, edit its
   action in the HTML — nothing in this file needs touching.

   All three forms currently point at the same Formspree form, so
   everything lands in the estimating inbox. Job applications are
   tagged with the subject "JOB APPLICATION from the website" so a
   mail rule can file or forward them.

   Note the free tier allows 50 submissions a month across the whole
   account, shared by all three forms. If that runs out, bid requests
   stop arriving.

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

    // Take validation away from the browser's pre-submit check. When that
    // check fails it swallows the click BEFORE our submit handler runs — and
    // if its bubble doesn't render, the button just looks dead. With
    // noValidate the submit event always fires, and WE run reportValidity()
    // below, where a failure always produces a visible message. Set from JS
    // so with JavaScript off the browser's own validation still applies.
    form.noValidate = true;

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

      try {

      if (trap && trap.value) return; // bot

      if (!configured) {
        setStatus(status, 'error', fallbackHTML(
          '<strong>This form isn\'t connected yet.</strong> Nothing was sent.'
        ));
        return;
      }

      // Validate ourselves and, on failure, name EVERY empty required field
      // loudly. A quiet jump-to-field read as "the button does nothing" — the
      // most common reason a filled-out-looking form won't send is one skipped
      // required field (often the checkbox at the very bottom).
      var invalid = [].filter.call(form.elements, function (el) {
        return el.willValidate && !el.checkValidity();
      });
      if (invalid.length) {
        var labels = invalid.map(function (el) {
          var lab = (el.id && form.querySelector('label[for="' + el.id + '"]')) ||
                    el.closest('label') ||
                    (el.closest('.field') && el.closest('.field').querySelector('label'));
          var text = lab ? lab.textContent : (el.name || 'a field');
          return text.replace(/\s+/g, ' ').trim().replace(/[:.]$/, '');
        });
        setStatus(status, 'error',
          '<strong>Please finish these before sending:</strong> ' +
          labels.join(' · '));
        invalid.forEach(function (el) {
          var box = el.closest('.field') || el;
          box.classList.add('field-error');
          el.addEventListener('input', function clear() {
            box.classList.remove('field-error'); el.removeEventListener('input', clear);
          });
        });
        invalid[0].scrollIntoView({ block: 'center' });
        try { invalid[0].focus({ preventScroll: true }); } catch (e) { invalid[0].focus(); }
        return;
      }

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
          // Go to a dedicated confirmation page. The old behaviour replaced the
          // form with an inline message where the form began — near the top of a
          // long application — so someone who submitted from the bottom never saw
          // it and thought nothing happened. A whole new page can't be scrolled
          // past. data-thanks names the page; default covers a form without one.
          window.location.href = form.getAttribute('data-thanks') || 'thanks.html';
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

      } catch (err) {
        // Something unexpected broke inside this handler. Never strand the
        // visitor on a dead button — hand the submission to the browser's
        // native form POST instead. It goes straight to Formspree, and the
        // _next hidden field brings the visitor back to our thank-you page.
        form.submit();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var forms = document.querySelectorAll('form[data-form]');
    for (var i = 0; i < forms.length; i++) wire(forms[i]);
  });
})();
