export default {
  Query: {
    seeFullPost: async (_, args, { prisma }) => {
      const { id } = args;
      const post = await prisma.post.findOne({
        where: { id },
        include: {
          user: { select: { userName: true } },
          files: { select: { url: true } },
          comments: { select: { user: true, text: true, updatedAt: true } },
        },
      });
      return post;
    },
  },
};
