import * as dotenv from 'dotenv';
dotenv.config();
import { generateToken } from '../../../utils/utils';

export default {
  Mutation: {
    loginFb: async (_, args, { prisma }) => {
      const { email, facebookId } = args;
      const user = await prisma.user.findMany({
        where: { AND: [{ email, facebookId }] },
      });

      if (!user.length) {
        return {
          user: null,
          token: null,
          error: 'There is no user.',
        };
      } else {
        return {
          user: user[0],
          token: generateToken(user[0].id),
          error: null,
        };
      }
    },
  },
};
