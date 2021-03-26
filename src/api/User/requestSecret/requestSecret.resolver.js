import { secretGenerator, sendSecretMail } from '../../../utils/utils';

export default {
  Mutation: {
    requestSecret: async (_, args, { prisma }) => {
      const { email } = args;
      const loginSecret = secretGenerator();
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        await sendSecretMail(email, user.userName, loginSecret);
        await prisma.user.update({
          where: { email },
          data: { loginSecret },
        });
        return {
          ok: true,
          error: null,
        };
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    },
  },
};
