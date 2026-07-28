/* ============================================================================
   OSI HubSpot Forms helper
   Single place that holds the HubSpot portal id + form GUIDs and submits leads
   to HubSpot's public Forms Submission API (no secret key needed — the portal id
   and form GUIDs are safe to expose). Replaces the old Formspree endpoint.

   Used by: the homepage contact form, the blog newsletter (blog/app.js), and the
   camera-sandbox registration gate + consultation request.

   Endpoint: https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
   ========================================================================== */
(function () {
  'use strict';

  var PORTAL_ID = '245760841'; // OSI HubSpot account (na2)

  // ── Form GUIDs ──────────────────────────────────────────────────────────────
  // Create these forms in HubSpot, then paste their GUIDs here.
  //   contact     fields: email, firstname, lastname, phone, message
  //   newsletter  fields: email
  //   sandbox     fields: email, firstname, lastname, company
  //   audit       fields: email, firstname, lastname, company, phone, message
  //               DEDICATED form for the /audit self-serve consultation page (not the
  //               shared 'contact' form) so those leads keep source attribution.
  // (A form GUID looks like "a1b2c3d4-1234-5678-9abc-de0123456789".)
  var FORMS = {
    contact: '3d6d2b5f-0f88-4787-8f9f-48585ae3280f',
    newsletter: '684c24b4-b7f5-4971-a683-eda20b0e254b',
    sandbox: 'e16288f0-029d-4a42-90e2-ea11d199e1e7',
    // ⚠ PENDING: paste the dedicated /audit form GUID from HubSpot (Barry to confirm).
    // While this keeps the 'REPLACE_WITH' sentinel, isConfigured('audit') is false and
    // the /audit form degrades gracefully to the "email us" fallback.
    audit: 'REPLACE_WITH_AUDIT_FORM_GUID'
  };

  function endpoint(formKey) {
    return 'https://api.hsforms.com/submissions/v3/integration/submit/' + PORTAL_ID + '/' + FORMS[formKey];
  }

  function isConfigured(formKey) {
    var g = FORMS[formKey];
    return !!g && g.indexOf('REPLACE_WITH') !== 0;
  }

  // Split a single "Full Name" field into HubSpot's firstname / lastname.
  function splitName(full) {
    var parts = (full || '').trim().split(/\s+/);
    var first = parts.shift() || (full || '').trim();
    return { firstname: first, lastname: parts.join(' ') };
  }

  // Read HubSpot's tracking cookie so a submission associates with the visitor.
  function hutk() {
    var m = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
    return m ? m[1] : null;
  }

  /**
   * Submit a lead to HubSpot.
   * @param {string} formKey  one of: 'contact' | 'newsletter' | 'sandbox'
   * @param {Object} values   plain object of { hubspotPropertyName: value }
   * @returns {Promise} resolves on success, rejects on error
   */
  function submit(formKey, values) {
    if (!isConfigured(formKey)) {
      return Promise.reject(new Error('HubSpot form "' + formKey + '" not configured yet'));
    }
    var fields = Object.keys(values)
      .filter(function (k) { return values[k] != null && String(values[k]).trim() !== ''; })
      .map(function (k) { return { name: k, value: String(values[k]) }; });

    var body = {
      fields: fields,
      context: { pageUri: location.href, pageName: document.title }
    };
    var tk = hutk();
    if (tk) body.context.hutk = tk;

    return fetch(endpoint(formKey), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (t) {
          throw new Error('HubSpot ' + res.status + ': ' + t.slice(0, 200));
        });
      }
      return res.json().catch(function () { return {}; });
    });
  }

  window.OSIHubSpot = {
    portalId: PORTAL_ID,
    forms: FORMS,
    isConfigured: isConfigured,
    splitName: splitName,
    submit: submit
  };
})();
