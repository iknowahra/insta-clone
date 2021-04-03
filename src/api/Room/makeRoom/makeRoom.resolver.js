//최선인지..? lodash를 이용해서 더 간단하게 만들 순 없는지..?
export default {
  Mutation: {
    makeRoom: async (
      _,
      { toIds, name },
      { request, prisma, isAuthenticated },
    ) => {
      isAuthenticated(request);
      const { user } = request;
      let duplication;
      if (toIds.includes(user.id)) {
        return {
          ok: false,
          error: `You cannot invite yourself`,
          room: null,
        };
      }
      if (toIds.length === 0) {
        return {
          ok: false,
          error: `You invite at least one person`,
          room: null,
        };
      }

      let conditions = toIds.map(id => {
        return {
          participants: {
            some: {
              id,
            },
          },
        };
      });

      let rooms = await prisma.room.findMany({
        where: {
          AND: [...conditions, { participants: { some: { id: user.id } } }],
        },
        include: { participants: true, messages: true },
      });

      rooms = rooms.filter(
        room => room.participants.length === toIds.length + 1,
      );

      if (!rooms.length) {
        duplication = false;
        conditions = toIds.map(id => {
          return {
            id,
          };
        });

        const newRoom = await prisma.room.create({
          data: {
            name,
            participants: {
              connect: [...conditions, { id: user.id }],
            },
          },
        });

        rooms = await prisma.room.findMany({
          where: {
            id: newRoom.id,
          },
          include: { participants: true, messages: true },
        });
      } else {
        duplication = true;
      }

      return {
        ok: true,
        error: null,
        room: rooms[0],
        duplication,
      };
    },
  },
};
