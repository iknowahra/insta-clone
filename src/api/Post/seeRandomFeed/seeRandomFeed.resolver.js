export default {
  Query: {
    seeRandomFeed: async (_, __, { prisma }) => {
      const posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: { orderBy: { createdAt: 'desc' } },
          likes: true,
          files: true,
        },
        orderBy: { updatedAt: 'desc' },
        take: 108,
      });
      return posts;
    },
  },
};
