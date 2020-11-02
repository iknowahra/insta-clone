export default {
  Query: {
    seeUser: async (_, args, { prisma }) => {
      const profile = await prisma.user.findOne({ where: { id: args.id } });
      const posts = await prisma.post.findMany({
        where: { user: { id: uer.id } },
      });
      return { user: profile, posts };
    },
  },
};
