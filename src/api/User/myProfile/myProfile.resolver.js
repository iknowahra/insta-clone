export default {
  Query: {
    myProfile: async (_, __, { prisma, request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const profile = await prisma.user.findOne({ where: { id: user.id } });
      const posts = await prisma.post.findMany({
        where: { user: { id: uer.id } },
      });

      return { user: profile, posts };
      // this is the same result as
      // await prisma.user.findOne({ where: { id: user.id } }).posts();
      // the latter translates longer query than the former.
    },
  },
};
