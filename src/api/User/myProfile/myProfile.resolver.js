export default {
  Query: {
    myProfile: async (_, __, { prisma, request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const profile = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
          followers: true,
          following: true,
        },
      });
      const posts = await prisma.post.findMany({
        where: { user: { id: user.id } },
        include: {
          files: true,
          comments: { orderBy: { createdAt: 'desc' } },
          likes: true,
          user: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      console.log(profile, posts);
      return { user: profile, posts };
      // this is the same result as
      // await prisma.user.findUnique({ where: { id: user.id } }).posts();
      // the latter translates longer query than the former.
    },
  },
};
