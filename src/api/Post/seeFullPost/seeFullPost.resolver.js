export default {
  Query: {
    seeFullPost: async (_, args, { prisma }) => {
      const { id } = args;
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          user: true,
          comments: { orderBy: { createdAt: 'desc' } },
          likes: true,
          files: true,
        },
      });
      return post;
    },
  },
};
