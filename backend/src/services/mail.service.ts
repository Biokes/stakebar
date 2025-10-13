import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { YeildFiException } from "../exception/index.error";


class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  private replaceVariables(html: string,variables: Record<string, string>): string {
    let result = html;
    Object.entries(variables).forEach(([key, value]) => {result = result.replace(new RegExp(`{{${key}}}`, "g"), value);});
    return result;
  }

  public async sendWelcomeEmail(email: string,name: string,appLink: string): Promise<void> {
    try {
      const html = this.replaceVariables(MailService.htmlContent, {name,appLink,year: new Date().getFullYear().toString(),});
      await this.resend.emails.send({from: process.env.APP_NAME as string,to: email,subject: MailService.APP_SUBJECT,html});
    } catch (error: any ) {
        throw new YeildFiException(error.message,"unable to send welcome mail");
    }
  }

  private static loadTemplate(filePath: string): string {
    const templatePath = path.join(__dirname, filePath);
    try {
      const html = fs.readFileSync(templatePath, "utf8");
      return html;
    } catch (error: any) {
      throw new YeildFiException(error.message || "Unknown file read error",`Unable to load template at ${templatePath}`);
    }
  }

  private static readonly htmlContent: string = MailService.loadTemplate( "../template/welcome.html");
  private static readonly APP_SUBJECT = "Welcome to YieldFi - Unlock Decentralized Yield";
}

export { MailService };