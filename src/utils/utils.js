import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { adjectives, nouns } from './words';
import mailgun from 'mailgun-js';

export const secretGenerator = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendSecretMail = (address, userName, secret) => {
  const domain = process.env.MAILGUN_DOMAIN;
  const apiKey = process.env.MAILGUN_API;
  const mg = mailgun({ apiKey, domain });
  const mailOptions = {
    from: `InstaClone <instaClone@${domain}>`,
    to: address,
    subject: '🔒 InstaClone Enter Key 🔒',
    html: `Dear Ms/Mr.${userName},</br>Welcome to join InstaClone 🎉</br>Your secret key is <strong>${secret}</strong>.</br>Copy paste on our app/website to log in.`,
  };

  return mg.messages().send(mailOptions, function (error, body) {
    console.log(body);
  });
};
