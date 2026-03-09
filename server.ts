import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Database from "better-sqlite3";
const db = new Database("vlsi_ind.db");

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    service TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Safely attempt to add the 'domain' column if it doesn't already exist from a previous database version
try {
  db.exec("ALTER TABLE contact_submissions ADD COLUMN domain TEXT;");
} catch (e) {
  // Column likely already exists, ignore
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "VLSI Ind API is running" });
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, service, domain, message } = req.body;

    try {
      const stmt = db.prepare("INSERT INTO contact_submissions (name, email, service, domain, message) VALUES (?, ?, ?, ?, ?)");
      stmt.run(name, email, service, domain, message);

      console.log(`Saved submission from ${name} (${email}) to database.`);

      // Email Transporter setup
      const COMPANY_EMAIL = "hr@vlsiind.in";
      const GMAIL_USER = process.env.GMAIL_USER;
      const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

      let isTestAccount = false;
      let transporter;
      let fromAddress = `"VLSI IND Website" <${GMAIL_USER || 'test@ethereal.email'}>`;

      try {
        if (GMAIL_USER && GMAIL_APP_PASSWORD && !GMAIL_USER.includes('your_actual_email') && GMAIL_APP_PASSWORD !== 'the_16_character_password') {
          // Use real Gmail if configured
          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: GMAIL_USER,
              pass: GMAIL_APP_PASSWORD,
            },
          });
          fromAddress = `"VLSI IND Website" <${GMAIL_USER}>`;
        } else {
          // Auto-generate Ethereal test account for development
          const testAccount = await nodemailer.createTestAccount();
          transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
              user: testAccount.user, 
              pass: testAccount.pass, 
            },
          });
          fromAddress = `"VLSI IND Testing" <${testAccount.user}>`;
          isTestAccount = true;
          console.log("\\n⚠️  Using auto-generated Ethereal Email for testing.");
        }

        // 1. Notify the company (hr@vlsiind.in) about the new inquiry
        const infoCompany = await transporter.sendMail({
          from: fromAddress,
          to: COMPANY_EMAIL,
          subject: `📩 New Contact Inquiry: ${service} from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #0a2540, #00f2ff22); padding: 32px; text-align: center;">
                <h1 style="color: #00f2ff; margin: 0; font-size: 24px;">New Contact Request</h1>
              </div>
              <div style="padding: 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #888; font-size: 13px; width: 120px;">NAME</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">EMAIL</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00f2ff;">${email}</a></td></tr>
                  <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">SERVICE</td><td style="padding: 8px 0; color: #d4af37; font-weight: bold;">${service}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">DOMAIN</td><td style="padding: 8px 0; color: #d4af37; font-weight: bold;">${domain || 'Not specified'}</td></tr>
                </table>
                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                <p style="color: #888; font-size: 13px; margin: 0 0 8px;">MESSAGE</p>
                <div style="background: #f8f8f8; border-left: 4px solid #00f2ff; padding: 16px; border-radius: 8px;">
                  <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
                <p style="margin-top: 24px; color: #888; font-size: 12px;">
                  Reply directly to <a href="mailto:${email}">${email}</a> to respond to this inquiry.
                </p>
              </div>
            </div>
          `,
          replyTo: email,
        });

        if (isTestAccount) {
          console.log("👉 Preview Company Notification: %s", nodemailer.getTestMessageUrl(infoCompany));
        }

        // 2. Send confirmation to the user
        const infoUser = await transporter.sendMail({
          from: fromAddress,
          to: email,
          subject: `✅ We received your message — VLSI IND`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #0a2540, #00f2ff22); padding: 32px; text-align: center;">
                <h1 style="color: #d4af37; margin: 0; font-size: 24px;">VLSI IND</h1>
                <p style="color: #aaa; margin: 8px 0 0;">Pioneering Semiconductor Design</p>
              </div>
              <div style="padding: 32px;">
                <h2 style="color: #0a2540; margin: 0 0 16px;">Hi ${name},</h2>
                <p style="color: #555; line-height: 1.6;">
                  Thank you for reaching out to us about <strong>${service}</strong>. We have received your inquiry and our team will review it shortly.
                </p>
                <p style="color: #555; line-height: 1.6;">
                  Our team will review your project requirements. In the meantime, feel free to explore our services or connect with us on LinkedIn.
                </p>
                <div style="margin: 32px 0; text-align: center;">
                  <a href="https://www.vlsiind.in" style="background: #00f2ff; color: #0a2540; padding: 12px 32px; border-radius: 100px; text-decoration: none; font-weight: bold;">Visit Our Website</a>
                </div>
                <p style="color: #aaa; font-size: 12px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">
                  VLSI IND Semiconductor R&D Division<br/>
                  NH75, ORR, Bengaluru, Karnataka 560036<br/>
                  +91 9187393632 | hr@vlsiind.in
                </p>
              </div>
            </div>
          `,
        });

        if (isTestAccount) {
          console.log("👉 Preview User Confirmation: %s\\n", nodemailer.getTestMessageUrl(infoUser));
        }

        console.log(`✅ Emails processed successfully.`);
      } catch (mailErr) {
        console.error("❌ Failed to process emails:", mailErr);
      }

      res.json({
        success: true,
        message: `Thank you, ${name}! Your message regarding ${service} has been received. Our team will get back to you shortly.`
      });
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
