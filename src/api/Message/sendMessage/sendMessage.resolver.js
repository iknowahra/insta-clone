export default {
  Mutation: {
    sendMessage: async (
      _,
      args,
      { prisma, isAuthenticated, request, pubsub },
    ) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, text } = args;
      try {
        const isRightUser = await prisma.room.count({
          where: {
            AND: [{ id: roomId }, { participants: { some: { id: user.id } } }],
          },
        });
        if (!isRightUser) {
          throw Error('This room is not your room.');
        } else {
          const message = await prisma.message.create({
            data: {
              text,
              room: { connect: { id: roomId } },
              user: { connect: { id: user.id } },
            },
          });
          pubsub.publish('newMessage', { newMessage: message });
          return message;
        }
      } catch (error) {
        throw Error('Oops. Something wrong!');
      }
    },
  },
};
