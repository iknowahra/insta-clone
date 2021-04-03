export default {
  Query: {
    getMessage: async (_, { roomId }, { request, prisma, isAuthenticated }) => {
      isAuthenticated(request);
      const messages = await prisma.message.findMany({
        where: { roomId },
        include: {
          user: true,
        },
      });
      return messages;
    },
  },
};
