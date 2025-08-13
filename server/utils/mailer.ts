// mailer.ts
import FormData from "form-data";
import Mailgun from "mailgun.js";

const mg = new Mailgun(FormData).client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,                 // must be the Private API key (key-...)
  url: "https://api.mailgun.net",
});

export async function sendMail(to: string, subject: string, html: string) {
  const domain = "mg.freetypingcamp.com";            // your VERIFIED sending domain
  const from = "FreeTypingCamp.com <no-reply@mg.freetypingcamp.com>"; // <-- match domain

  try {
    const data = await mg.messages.create(domain, {
      from,
      to,
      subject,
      html,
    });
    return data;
  } catch (err: any) {
    console.error("Mail send error (verification):", {
      status: err?.status,
      message: err?.message,
      details: err?.details,   // Mailgun often includes JSON reason here
      domain,
      baseUrl: process.env.MAILGUN_BASE_URL || "https://api.mailgun.net",
      from,
      to,
    });
    throw err;
  }
}


