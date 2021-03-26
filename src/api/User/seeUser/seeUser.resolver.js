export default {
  Query: {
    seeUser: async (_, args, { prisma }) => {
      const { userName } = args;
      const user = await prisma.user.findUnique({
        where: { userName },
        include: {
          followers: true,
          following: true,
        },
      });
      const posts = await prisma.post.findMany({
        where: { user: { userName } },
        include: {
          files: true,
          comments: { orderBy: { createdAt: 'desc' } },
          likes: true,
          user: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      return { user, posts };
    },
  },
};
