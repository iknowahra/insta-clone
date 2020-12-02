export default {
  Query: {
    searchPost: async (_, args, { prisma }) =>
      await prisma.post.findMany({
        where: {
          OR: [
            { location: { startsWith: args.term } },
            { caption: { startsWith: args.term } },
          ],
        },
        include: {
          files: true,
          comments: { orderBy: { createdAt: 'desc' } },
          likes: true,
          user: true,
        },
      }),
  },
};
