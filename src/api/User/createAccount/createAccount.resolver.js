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
        name: userInitName = '',
        bio = '',
        avatar = '',
        facebookId,
      } = args;
      try {
        const checkEmail = await prisma.user.findUnique({
          where: { email },
        });
        const checkUserName = await prisma.user.findUnique({
          where: { userName },
        });
        if (!checkEmail && !checkUserName) {
          const hash =
            password === '' ? '' : bcrypt.hashSync(password, SALT_ROUNDS);
          const confirmSecret = facebookId ? true : false;
          const name = userInitName || `${firstName} ${lastName}`;
          await prisma.user.create({
            data: {
              userName,
              email,
              password: hash,
              firstName,
              lastName,
              name,
              bio,
              avatar,
              facebookId,
              confirmSecret,
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
