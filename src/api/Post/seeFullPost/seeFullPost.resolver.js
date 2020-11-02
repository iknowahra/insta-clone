export default {
  Query: {
    seeFullPost: async (_, args, { prisma }) => {
      const { id } = args;
      const post = await prisma.post.findOne({
        where: { id },
        include: { user: { select: { userName: true } } },
      });
      const comments = await prisma.comment.findMany({
        where: { post: { id } },
      });
      const likeCount = await prisma.like.count({ where: { post: { id } } });
      return {
        post,
        comments,
        likeCount,
      };
    },
  },
};
