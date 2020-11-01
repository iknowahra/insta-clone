import { isAuthenticated } from '../../../utils/middlewares';

export default {
  Mutation: {
    unfollowUser: async (_, args, { prisma, request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            following: {
              disconnect: { id },
            },
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
