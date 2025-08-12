// mailer.ts
import FormData from "form-data";
import Mailgun from "mailgun.js";

const mg = new Mailgun(FormData).client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,       // set this in env when I serisouly deploy with paid plan
  url: process.env.MAILGUN_BASE_URL || "https://api.mailgun.net", // use EU URL if needed
});

// Helper to send emails. Keep your routes unchanged and call sendMail(...)
export async function sendMail(to: string, subject: string, html: string) {
  const domain = "mg.freetypingcamp.com";  // e.g. mg.freetypingcamp.com (NOT sandbox in prod)
  const from = process.env.MAIL_FROM || 'FreeTypingCamp.com <no-reply@freetypingcamp.com>';

  const actualRecipient =
    process.env.NODE_ENV === "development" ? "freetypingcamp@gmail.com" : to;

  // NOTE: Mailgun sandbox domains can only send to Authorized Recipients.
  // For production, verify & use a real domain (e.g., mg.freetypingcamp.com).
  const data = await mg.messages.create(domain, {
    from,
    to: [actualRecipient],
    subject,
    html,
    // (optional) provide a text fallback:
    // text: stripHtmlToText(html)
  });

  return data; // Mailgun response
}
