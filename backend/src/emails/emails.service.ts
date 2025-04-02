import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailsService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
        tls: {
          rejectUnauthorized:
            process.env.NODE_ENV !== 'production',
        },
        secure: false,
        requireTLS: true,
        logger: true,
        debug: true,
      },
    );
  }

  async sendVerificationEmail(
    email: string,
    token: string,
  ): Promise<void> {
    try {
      const verificationUrl = `${process.env.APP_URL}/users/verify-email?token=${token}`;

      await this.transporter.sendMail({
        from: `Regenerative Aesthetics <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Verify Your Email',
        html: `
        <h2>Please verify your email</h2>
        <p>Click the link below to verify your email address:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
      });
    } catch (error) {
      console.error(
        'Error sending verification email:',
        error,
      );
      throw new Error(
        'Failed to send verification email',
      );
    }
  }
}
