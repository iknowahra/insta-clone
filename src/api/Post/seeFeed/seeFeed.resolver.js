export default {
  Query: {
    seeFeed: async (_, __, { prisma, isAuthenticated, request }) => {
      isAuthenticated(request);
      const { user } = request;
      const followings = await prisma.user
        .findOne({
          where: { id: user.id },
        })
        .following({ select: { id: true } });
      const posts = await prisma.post.findMany({
        where: {
          userId: { in: [...followings, { id: user.id }].map(user => user.id) },
        },
        include: {
          user: true,
          comments: { orderBy: { createdAt: 'desc' } },
          likes: true,
          files: true,
        },
        orderBy: { updatedAt: 'desc' },
      });
      return posts;
    },
  },
};
