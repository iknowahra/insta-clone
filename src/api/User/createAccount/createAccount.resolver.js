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
        const existingUser = await prisma.user.findOne({ where: { email } });
        if (!existingUser) {
          const hash = bcrypt.hashSync(password, SALT_ROUNDS);
          console.log(hash);
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
          return {
            ok: false,
            error: 'Already enrolled user!',
          };
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
