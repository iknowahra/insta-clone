import { secretGenerator, sendSecretMail } from '../../../utils/utils';

export default {
  Mutation: {
    requestSecret: async (_, args, { prisma }) => {
      const { email, userName } = args;
      const loginSecret = secretGenerator();
      try {
        await sendSecretMail(email, userName, loginSecret);
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
