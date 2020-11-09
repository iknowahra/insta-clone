import * as dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import { generateToken } from '../../../utils/utils';

export default {
  Mutation: {
    loginEmail: async (_, args, { prisma }) => {
      const { email, password } = args;
      const user = await prisma.user.findOne({
        where: { email },
      });
      if (!user) {
        return {
          token: null,
          error: 'There is no user.',
        };
      } else {
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (checkPassword) {
          return {
            token: generateToken(user.id),
            error: null,
          };
        } else {
          return {
            token: null,
            error: 'Wrong password',
          };
        }
      }
    },
  },
};
