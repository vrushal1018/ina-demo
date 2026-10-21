import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const firstName = (body.firstName as string)?.trim() || "";
    const lastName = (body.lastName as string)?.trim() || "";
    const email = (body.email as string)?.trim() || "";
    const phone = (body.phone as string)?.trim() || "";
    const company = (body.company as string)?.trim() || "";
    const subject = (body.subject as string)?.trim() || "";
    const message = (body.message as string)?.trim() || "";

    // Validate required fields
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields (First name, Email, and Message)." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Check SMTP configuration
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "connect@inatechfmglobal.com";
    const smtpFrom =
      process.env.SMTP_FROM && !process.env.SMTP_FROM.includes("your-email@gmail.com")
        ? process.env.SMTP_FROM
        : `Ina Tech FM Website <${smtpUser}>`;

    if (!smtpUser || !smtpPass || smtpUser === "your-email@gmail.com" || smtpPass === "your-smtp-password") {
      return NextResponse.json(
        {
          error:
            "SMTP is not yet configured on the server. Please update SMTP_USER and SMTP_PASS in your .env.local file.",
        },
        { status: 500 }
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const formattedDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const emailSubject = subject
      ? `New Contact Inquiry: ${subject} - ${fullName}`
      : `New Contact Inquiry from ${fullName}`;

    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "Not provided";
    const safeCompany = company ? escapeHtml(company) : "Not provided";
    const safeSubject = subject ? escapeHtml(subject) : "General Inquiry";
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333333; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #eef0f3; }
          .header { background: linear-gradient(135deg, #1C3A62 0%, #0F233D 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; font-size: 14px; opacity: 0.85; }
          .badge { display: inline-block; background: #2495D3; color: #ffffff; font-size: 12px; font-weight: 600; padding: 4px 14px; border-radius: 999px; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .content { padding: 32px 28px; }
          .section-title { font-size: 14px; font-weight: 700; color: #1C3A62; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 2px solid #2495D3; padding-bottom: 6px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .info-table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #f0f2f5; }
          .info-table td.label { font-weight: 600; color: #585858; width: 32%; background: #fafbfc; border-radius: 6px; }
          .info-table td.value { font-weight: 500; color: #1C3A62; }
          .message-box { background: #F8FAFC; border-left: 4px solid #2495D3; border-radius: 6px; padding: 16px 20px; font-size: 14px; line-height: 1.6; color: #2D3748; margin-top: 10px; }
          .footer { background: #fafbfc; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #f0f2f5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Website Contact Message</h1>
            <p>A visitor submitted an inquiry through the Contact page</p>
            <div class="badge">${safeSubject}</div>
          </div>
          <div class="content">
            <div class="section-title">Sender Information</div>
            <table class="info-table">
              <tr>
                <td class="label">Name</td>
                <td class="value"><strong>${safeFullName}</strong></td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${safeEmail}" style="color: #2495D3; text-decoration: none; font-weight: 600;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td class="label">Phone Number</td>
                <td class="value">${phone ? `<a href="tel:${safePhone}" style="color: #2495D3; text-decoration: none; font-weight: 600;">${safePhone}</a>` : "Not provided"}</td>
              </tr>
              <tr>
                <td class="label">Company</td>
                <td class="value">${safeCompany}</td>
              </tr>
              <tr>
                <td class="label">Subject</td>
                <td class="value">${safeSubject}</td>
              </tr>
              <tr>
                <td class="label">Submitted At</td>
                <td class="value">${formattedDate} (IST)</td>
              </tr>
            </table>

            <div class="section-title">Message Body</div>
            <div class="message-box">
              ${safeMessage}
            </div>
          </div>
          <div class="footer">
            <p style="margin: 0;">This email was sent from the contact form on <strong>Ina Tech FM Global</strong> website to <strong>${recipientEmail}</strong>.</p>
            <p style="margin: 6px 0 0 0; color: #a0aec0; font-size: 11px;">You can reply directly to this email to contact the sender.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const plainText = `
New Contact Inquiry from Ina Tech FM Website

Name: ${fullName}
Email: ${email}
Phone: ${phone || "Not provided"}
Company: ${company || "Not provided"}
Subject: ${subject || "General Inquiry"}
Submitted At: ${formattedDate} (IST)

Message:
${message}

---
Inquiry routed to: ${recipientEmail}
    `.trim();

    await transporter.sendMail({
      from: smtpFrom,
      to: recipientEmail,
      replyTo: email,
      subject: emailSubject,
      text: plainText,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your message has been sent successfully. Our team will get back to you shortly.",
    });
  } catch (error: unknown) {
    console.error("Error sending contact email:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to send your message. Please try again later or email us directly.";
    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
