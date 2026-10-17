import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = (formData.get("name") as string)?.trim();
    const contact = (formData.get("contact") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const address = (formData.get("address") as string)?.trim();
    const jobTitle = (formData.get("jobTitle") as string)?.trim() || "Technical Supervisor";
    const resumeFile = formData.get("resume") as File | null;

    // Validate required fields
    if (!name || !contact || !address) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Contact, and Address)." },
        { status: 400 }
      );
    }

    // Check SMTP configuration
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const recipientEmail = process.env.CAREERS_RECIPIENT_EMAIL || "jaisalil.s@inaspaceworks.com";
    const smtpFrom = process.env.SMTP_FROM || `Ina Tech FM Careers <${smtpUser}>`;

    if (!smtpUser || !smtpPass || smtpUser === "your-email@gmail.com" || smtpPass === "your-smtp-password") {
      return NextResponse.json(
        {
          error:
            "SMTP is not yet configured on the server. Please update SMTP_USER and SMTP_PASS in your .env.local file.",
        },
        { status: 500 }
      );
    }

    // Prepare attachments
    const attachments: Array<{ filename: string; content: Buffer; contentType?: string }> = [];

    if (resumeFile && typeof resumeFile.arrayBuffer === "function" && resumeFile.size > 0) {
      // 10MB limit check
      if (resumeFile.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Resume file size exceeds the 10MB limit." },
          { status: 400 }
        );
      }

      const arrayBuffer = await resumeFile.arrayBuffer();
      attachments.push({
        filename: resumeFile.name || "Resume.pdf",
        content: Buffer.from(arrayBuffer),
        contentType: resumeFile.type || "application/octet-stream",
      });
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

    const emailSubject = `New Job Application: ${jobTitle} - ${name}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333333; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.06); border: 1px solid #eef0f3; }
          .header { background: linear-gradient(135deg, #1C3A62 0%, #0F233D 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; font-size: 14px; opacity: 0.85; }
          .badge { display: inline-block; background: #2495D3; color: #ffffff; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 999px; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
          .content { padding: 32px 28px; }
          .section-title { font-size: 15px; font-weight: 700; color: #1C3A62; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 2px solid #2495D3; padding-bottom: 6px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .info-table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #f0f2f5; }
          .info-table td.label { font-weight: 600; color: #585858; width: 35%; background: #fafbfc; border-radius: 6px; }
          .info-table td.value { font-weight: 500; color: #1C3A62; }
          .resume-box { background: #F0F8FD; border: 1px solid #BEE3F8; border-radius: 10px; padding: 16px; margin-top: 16px; display: flex; align-items: center; }
          .footer { background: #fafbfc; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #f0f2f5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Job Application Received</h1>
            <p>Candidate applied via Ina Tech FM Careers Portal</p>
            <div class="badge">${jobTitle}</div>
          </div>
          <div class="content">
            <div class="section-title">Candidate Details</div>
            <table class="info-table">
              <tr>
                <td class="label">Full Name</td>
                <td class="value"><strong>${name}</strong></td>
              </tr>
              <tr>
                <td class="label">Position</td>
                <td class="value">${jobTitle}</td>
              </tr>
              <tr>
                <td class="label">Contact / Phone</td>
                <td class="value"><a href="tel:${contact}" style="color: #2495D3; text-decoration: none; font-weight: 600;">${contact}</a></td>
              </tr>
              ${email ? `
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${email}" style="color: #2495D3; text-decoration: none;">${email}</a></td>
              </tr>
              ` : ""}
              <tr>
                <td class="label">Current Address</td>
                <td class="value">${address}</td>
              </tr>
              <tr>
                <td class="label">Submission Date</td>
                <td class="value">${formattedDate}</td>
              </tr>
            </table>

            <div class="section-title">Attached Resume</div>
            ${attachments.length > 0
              ? `<p style="font-size: 14px; color: #2e7d32; font-weight: 600;">✓ Resume attached: <em>${attachments[0].filename}</em> (${(attachments[0].content.length / 1024).toFixed(1)} KB)</p>`
              : `<p style="font-size: 14px; color: #d32f2f;">No resume was uploaded.</p>`
            }
          </div>
          <div class="footer">
            <p style="margin: 0;">This email was automatically generated from the Careers page at <strong>Ina Tech FM</strong>.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: smtpFrom,
      to: recipientEmail,
      replyTo: email || smtpUser,
      subject: emailSubject,
      text: `New Application for ${jobTitle}\n\nName: ${name}\nContact: ${contact}\nEmail: ${email || "N/A"}\nAddress: ${address}\nDate: ${formattedDate}\nResume: ${attachments.length > 0 ? attachments[0].filename : "None"}\n`,
      html: emailHtml,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Your resume has been sent to our recruitment team.",
    });
  } catch (error: any) {
    console.error("Error sending application email:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to submit application. Please check your SMTP settings or try again later.",
      },
      { status: 500 }
    );
  }
}
