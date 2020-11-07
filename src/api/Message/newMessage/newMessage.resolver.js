export default {
  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub }) => {
        console.log(pubsub.asyncIterator('newMessage'));
        return pubsub.asyncIterator('newMessage');
      },
      resolve: (payload, _, { prisma }) => {
        const { id } = payload.newMessage;
        return prisma.message.findOne({ where: { id } });
      },
    },
  },
};
