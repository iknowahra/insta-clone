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
      try {
        const checkEmail = await prisma.user.findOne({
          where: { email },
        });
        const checkUserName = await prisma.user.findOne({
          where: { userName },
        });
        if (!checkEmail && !checkUserName) {
          const hash = bcrypt.hashSync(password, SALT_ROUNDS);
          await prisma.user.create({
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

          return {
            ok: true,
            error: null,
          };
        } else {
          if (checkEmail) {
            return {
              ok: false,
              error: 'Already enrolled email!',
            };
          } else if (checkUserName) {
            return {
              ok: false,
              error: 'Already enrolled username!',
            };
          }
        }
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    },
  },
};
