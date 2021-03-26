import { isAuthenticated } from '../../../utils/middlewares';

export default {
  Mutation: {
    addComment: async (_, args, { prisma, request }) => {
      isAuthenticated(request);
      const { postId, text } = args;
      const { user } = request;
      const newComment = await prisma.comment.create({
        data: {
          post: { connect: { id: postId } },
          user: { connect: { id: user.id } },
          text,
        },
      });

      return newComment;
    },
  },
};
