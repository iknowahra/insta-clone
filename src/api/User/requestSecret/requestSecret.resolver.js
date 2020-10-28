import { secretGenerator } from '../../../utils/utils';

export default {
  Mutation: {
    requestSecret: async (_, args, context) => {
      const { email } = args;
      const loginSecret = secretGenerator();
      try {
        await context.prisma.user.update({
          where: { email },
          data: { loginSecret },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
