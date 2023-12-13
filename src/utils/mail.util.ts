import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

interface ConfigMailer {
  to: string;
  subject: string;
  text: string;
  html: string;
}

@Injectable()
export class MailUtil {
  async sendEmail(config: ConfigMailer) {
    const transport = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.PASSWORD_SENDER_EMAIL,
      },
    });
    try {
      await transport.sendMail({
        from: 'Pet Connection',
        to: config.to,
        subject: config.subject,
        html: config.html,
        text: config.text,
      });
      return true;
    } catch (e) {
      console.log(e);
    }
  }
}
