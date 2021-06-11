import { tidyArgs } from '../../../utils/utils';
export default {
  Mutation: {
    editUser: async (_, args, { request, prisma, isAuthenticated }) => {
      try {
        isAuthenticated(request);
        const { user } = request;
        const cleanArgs = tidyArgs(args);
        await prisma.user.update({
          where: { id: user.id },
          data: { ...cleanArgs },
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
