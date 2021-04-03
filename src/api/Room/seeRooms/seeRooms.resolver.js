export default {
  Query: {
    seeRooms: (_, __, { request, prisma, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.room.findMany({
        where: { participants: { some: { id: user.id } } },
        include: {
          participants: true,
          messages: { orderBy: { createdAt: 'desc' } },
        },
        orderBy: { updatedAt: 'desc' },
      });
    },
  },
};
