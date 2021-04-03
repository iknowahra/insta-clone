const NEW_MESSAGE = 'NEW_MESSAGE';
export default {
  Mutation: {
    sendMessage: async (
      _,
      { roomId, text },
      { prisma, isAuthenticated, request, pubsub },
    ) => {
      isAuthenticated(request);
      const { user } = request;

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
          const newMessage = await prisma.message.findUnique({
            where: { id: message.id },
            include: { room: true, user: true },
          });

          pubsub.publish(NEW_MESSAGE, { newMessage });
          return newMessage;
        }
      } catch (error) {
        throw Error('Oops. Something wrong!');
      }
    },
  },
};
