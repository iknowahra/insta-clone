import * as dotenv from 'dotenv';
dotenv.config();
import { generateToken } from '../../../utils/utils';

export default {
  Mutation: {
    loginFb: async (_, { email, facebookId }, { prisma }) => {
      let user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return {
          user: null,
          token: null,
          error: 'There is no user.',
        };
      } else {
        if (user.facebookId !== facebookId) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              facebookId,
            },
          });
          user = await prisma.user.findUnique({ where: { id: user.id } });
        }
        return {
          user: user,
          token: generateToken(user.id),
          error: null,
        };
      }
    },
  },
};
