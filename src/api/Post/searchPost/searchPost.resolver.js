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
      }),
  },
};
