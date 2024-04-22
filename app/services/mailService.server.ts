import nodemailer, { Transporter } from "nodemailer";

interface Mail {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface MailService {
  transporter: Transporter | null;
  create(): Transporter;
  send(mail: Mail): Promise<void>;
}

const mailService: MailService = {
  transporter: null,

  create() {
    if (this.transporter) return this.transporter;
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    return this.transporter;
  },

  async send(mail) {
    const transporter = this.create();
    await transporter.sendMail({
      from: `"${mail.name}" <${mail.email}>`,
      to: process.env.MAIL_EMAIL,
      subject: mail.subject,
      text: mail.message,
      replyTo: mail.email,
    });
  },
};

export default mailService;
