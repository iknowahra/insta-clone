import * as dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export default {
  Mutation: {
    createAccount: async (_, args, { prisma }) => {
      const {
        userName,
        password,
        email,
        firstName = '',
        lastName = '',
        bio = '',
        avatar = '',
      } = args;
      const existingUser = await prisma.user.findOne({ where: { email } });
      if (!existingUser) {
        const hash = bcrypt.hashSync(password, SALT_ROUNDS);
        console.log(hash);
        return prisma.user.create({
          data: {
            userName,
            email,
            password: hash,
            firstName,
            lastName,
            bio,
            avatar,
          },
        });
      } else {
        throw Error('This Email has already been joined');
      }
    },
  },
};
