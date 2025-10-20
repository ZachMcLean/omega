import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(opts: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}) {
  await resend.emails.send({
    from: opts.from ?? (process.env.EMAIL_FROM as string),
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
}


// resend.emails.send({
//     from: 'onboarding@resend.dev',
//     to: 'zmdev21@gmail.com',
//     subject: 'Hello World',
//     html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
//   });