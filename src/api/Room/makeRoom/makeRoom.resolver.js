export default {
  Mutation: {
    makeRoom: async (_, args, { request, prisma, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { toId } = args;
      if (toId === user.id) {
        throw Error('You cannot invite yourself.');
      } else {
        let room = await prisma.room.findMany({
          where: {
            AND: [
              { participants: { some: { id: user.id } } },
              { participants: { some: { id: toId } } },
            ],
          },
          include: { participants: true },
        });

        if (!room.length) {
          room = await prisma.room.create({
            data: {
              participants: {
                connect: [{ id: user.id }, { id: toId }],
              },
            },
          });
        }
        return room[0];
      }
    },
  },
};
