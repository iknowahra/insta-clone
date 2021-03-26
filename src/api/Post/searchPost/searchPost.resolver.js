export default {
  Query: {
    searchPost: async (_, args, { prisma }) => {
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              location: {
                contains: args.term,
              },
            },
            {
              caption: {
                contains: args.term,
              },
            },
          ],
        },
        include: {
          files: true,
          comments: { orderBy: { createdAt: 'desc' } },
          likes: true,
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return posts;
    },
  },
};
