export default {
  Query: {
    searchRoom: (_, { term }, { request, prisma, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.room.findMany({
        where: {
          AND: [
            {
              participants: {
                some: {
                  userName: {
                    contains: term,
                  },
                },
              },
            },
            {
              participants: {
                some: {
                  id: user.id,
                },
              },
            },
          ],
        },
        include: {
          participants: true,
          messages: { orderBy: { createdAt: 'desc' } },
        },
        orderBy: { updatedAt: 'desc' },
      });
    },
  },
};
