import { adjectives, nouns } from './words';

export const secretGenerator = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = email => null;

export const sendSecretMail = (address, secret) => {};
