import { isAuthenticated } from '../../../utils/middlewares';

export default {
  Query: {
    getComment: async (_, args, { prisma, request }) => {
      isAuthenticated(request);
      const { id } = args;
      const comment = await prisma.comment.findUnique({
        where: {
          id,
        },
      });
      return comment;
    },
  },
};
