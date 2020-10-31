import { isAuthenticated } from '../../../utils/middlewares';

export default {
  Mutation: {
    toggleLike: async (_, args, { prisma, request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      try {
        const existingLike = await prisma.like.findMany({
          where: { postId, userId: user.id },
        });
        if (existingLike.length) {
          await prisma.like.deleteMany({
            where: { postId, userId: user.id },
          });
        } else {
          await prisma.like.create({
            data: {
              post: { connect: { id: postId } },
              user: { connect: { id: user.id } },
            },
          });
        }
        return true;
      } catch (error) {
        return error;
      }
    },
  },
};
