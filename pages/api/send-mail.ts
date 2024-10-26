import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function sendMail(request: NextApiRequest, result: NextApiResponse) {
  const { email, code } = request.body;
  if (request.method !== 'POST') {
    return result.status(405).json({ message: 'Only POST requests allowed' });
  }
  try {
    const transport = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'api',
        pass: '77b2667d5125689b06ed3ad77c1e7cff',
      },
    });
    const mailOptions = {
      from: 'Optimus marketing" <ronaldkamgaing4@demomailtrap.com>',
      to: email,
      subject: 'Your verification code',
      text: `Your verification code is: ${code} .paste it on the website to verify your identity.Please ignore this message if you didn't initiate this request`,
    };
    await transport.sendMail(mailOptions);
    return result.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return result.status(500).json({ error: 'Failed to send email' });
  }
}
