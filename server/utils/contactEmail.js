// HTML template for the contact-form notification email (Resend).
// Email clients ignore <style> blocks and external CSS, so everything is
// inline styles on table-based layout — the only markup that renders
// consistently across Gmail, Outlook, and Apple Mail.

// User input is interpolated into HTML, so it must be escaped to keep a
// crafted "message" from injecting markup into the inbox.
const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));

const AMBER = '#f59e0b';
const AMBER_BRIGHT = '#fbbf24';
const BG_DARK = '#0a101e';
const BG_CARD = '#0f172a';
const TEXT_MAIN = '#f8fafc';
const TEXT_MUTED = '#94a3b8';

const buildContactEmailHtml = ({ name, email, message }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br />');
  const receivedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: your message on sumitkr.dev`)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New portfolio message</title>
</head>
<body style="margin:0;padding:0;background-color:#e9ecf1;">
  <!-- Preheader: shows as the preview line in the inbox, hidden in the body -->
  <div style="display:none;max-height:0;overflow:hidden;">
    ${safeName} sent you a message via your portfolio contact form.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#e9ecf1;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header card -->
          <tr>
            <td style="background-color:${BG_DARK};border-radius:14px 14px 0 0;padding:28px 32px 24px;border-bottom:2px solid ${AMBER};">
              <p style="margin:0 0 6px;font-family:Consolas,Menlo,monospace;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${AMBER_BRIGHT};">
                Portfolio / Contact
              </p>
              <h1 style="margin:0;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:24px;line-height:1.3;color:${TEXT_MAIN};font-weight:800;">
                New message from <span style="color:${AMBER_BRIGHT};">${safeName}</span>
              </h1>
            </td>
          </tr>

          <!-- Sender details -->
          <tr>
            <td style="background-color:${BG_CARD};padding:24px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(148,163,184,0.15);">
                    <span style="font-family:Consolas,Menlo,monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${TEXT_MUTED};">From</span><br />
                    <span style="font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:15px;color:${TEXT_MAIN};font-weight:600;">${safeName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(148,163,184,0.15);">
                    <span style="font-family:Consolas,Menlo,monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${TEXT_MUTED};">Email</span><br />
                    <a href="mailto:${safeEmail}" style="font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:15px;color:${AMBER_BRIGHT};font-weight:600;text-decoration:none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <span style="font-family:Consolas,Menlo,monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${TEXT_MUTED};">Received</span><br />
                    <span style="font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:15px;color:${TEXT_MAIN};">${receivedAt} IST</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message body -->
          <tr>
            <td style="background-color:${BG_CARD};padding:16px 32px 28px;">
              <p style="margin:0 0 10px;font-family:Consolas,Menlo,monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${TEXT_MUTED};">Message</p>
              <div style="background-color:rgba(245,158,11,0.06);border-left:3px solid ${AMBER};border-radius:0 8px 8px 0;padding:16px 18px;">
                <p style="margin:0;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:15px;line-height:1.7;color:#e2e8f0;">${safeMessage}</p>
              </div>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="background-color:${BG_CARD};border-radius:0 0 14px 14px;padding:0 32px 32px;" align="left">
              <a href="${replyHref}"
                 style="display:inline-block;background-color:${AMBER};color:#1a1204;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:8px;">
                Reply to ${safeName}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;" align="center">
              <p style="margin:0;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:12px;line-height:1.6;color:#64748b;">
                Sent from the contact form at
                <a href="https://sumitkr.dev" style="color:#64748b;text-decoration:underline;">sumitkr.dev</a><br />
                The message is also saved in your admin dashboard.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

const buildContactEmailText = ({ name, email, message }) =>
  `New portfolio message\n\nName: ${name}\nEmail: ${email}\n\n${message}\n\n—\nSent from sumitkr.dev · also saved in the admin dashboard`;

module.exports = { buildContactEmailHtml, buildContactEmailText };
