import nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import path from "path";
import { YeildFiException } from "../exception/index.error";
import "dotenv/config";
import juice from "juice";

class MailService {
  private readonly transporter: Transporter;
  private static readonly VERIFICATION_URL = "http://localhost:3000/api/v1/users/verify";
  
  constructor() {
    this.transporter =  nodemailer.createTransport({
        service: process.env.GOOGLE_SERVICE,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });
  }
  private replaceVariables(html: string,variables: Record<string, string>): string {
    let result = html;
    Object.entries(variables).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
    });
    return result;
  }

  public async sendWelcomeEmail(email: string): Promise<void> {
    try {
      const inlinedHtml = juice(MailService.htmlContent);
      const html = this.replaceVariables(inlinedHtml, {
        name: email,
        year: new Date().getFullYear().toString(),
        verify_link: `${MailService.VERIFICATION_URL}/${encodeURIComponent(email)}`
      });
      await this.transporter.sendMail({
        from: `"YieldFi" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Welcome to YieldFI",
        html,
      });
   
    } catch (error: any) {
      throw new YeildFiException(error.message, "unable to send welcome mail");
    }
  }

  private static loadTemplate(filePath: string): string {
    const templatePath = path.join(__dirname, filePath);
    try {
      const html = fs.readFileSync(templatePath, "utf8");
      return html;
    } catch (error: any) {
      throw new YeildFiException(
        error.message || "Unknown file read error",
        `Unable to load template at ${templatePath}`
      );
    }
  }

  private static readonly htmlContent: string = MailService.loadTemplate(
    "../template/welcome.html"
  );

}

export { MailService };
