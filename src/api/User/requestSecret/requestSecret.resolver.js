import { secretGenerator, sendSecretMail } from '../../../utils/utils';

export default {
  Mutation: {
    requestSecret: async (_, args, context) => {
      const { email, userName } = args;
      const loginSecret = secretGenerator();
      try {
        await sendSecretMail(email, userName, loginSecret);
        await context.prisma.user.update({
          where: { email },
          data: { loginSecret },
        });
        return true;
      } catch (error) {
        return error;
      }
    },
  },
};
