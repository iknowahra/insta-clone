const NEW_MESSAGE = 'NEW_MESSAGE';
import { withFilter } from 'graphql-yoga';
export default {
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(NEW_MESSAGE),
        (payload, { roomId }) => {
          console.log('***!!!', payload, roomId);
          return payload.newMessage.roomId === roomId;
        },
      ),
    },
  },
};
