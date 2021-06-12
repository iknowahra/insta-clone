import * as dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import { tidyArgs } from '../../../utils/utils';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export default {
  Mutation: {
    editUser: async (_, args, { request, prisma, isAuthenticated }) => {
      try {
        isAuthenticated(request);
        const { user } = request;
        const { password } = args;
        const cleanArgs = tidyArgs(args);
        const hash = !password
          ? undefined
          : bcrypt.hashSync(password, SALT_ROUNDS);
        await prisma.user.update({
          where: { id: user.id },
          data: {
            userName: cleanArgs.userName,
            email: cleanArgs.email,
            firstName: cleanArgs.firstName,
            lastName: cleanArgs.lastName,
            bio: cleanArgs.bio,
            avatar: cleanArgs.avatar,
            password: hash,
          },
        });
        return {
          ok: true,
          error: false,
        };
      } catch (error) {
        return {
          ok: false,
          error: error,
        };
      }
    },
  },
};
