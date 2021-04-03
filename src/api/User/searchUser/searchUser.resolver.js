export default {
  Query: {
    searchUser: async (_, args, { prisma }) => {
      const { term } = args;
      return await prisma.user.findMany({
        where: {
          OR: [
            {
              userName: {
                contains: term,
              },
            },
            {
              name: {
                contains: term,
              },
            },
            {
              firstName: {
                contains: term,
              },
            },
            {
              lastName: {
                contains: term,
              },
            },
          ],
        },
        include: {
          followers: true,
          following: true,
        },
      });
    },
  },
};
