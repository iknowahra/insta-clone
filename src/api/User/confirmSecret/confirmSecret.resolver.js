import { generateToken } from '../../../utils/utils';

export default {
  Mutation: {
    confirmSecret: async (_, args, { prisma }) => {
      const { email, secret } = args;
      const user = await prisma.user.findOne({ where: { email } });
      if (user.loginSecret === secret) {
        const token = generateToken(user.id);
        return token;
      } else {
        throw Error('wrong email/secret combination');
      }
    },
  },
};
