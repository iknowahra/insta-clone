const EDIT = 'EDIT';
const DELETE = 'DELETE';

export default {
  Mutation: {
    editPost: async (_, args, { prisma, isAuthenticated, request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id, caption, location, action } = args;
      const post = await prisma.post.findMany({
        where: { AND: [{ id }, { userId: user.id }] },
      });
      if (post.length) {
        if (action === DELETE) {
          await prisma.onDelete({
            model: 'Post',
            where: { id },
            deleteParent: true,
          });
          return await prisma.post.findMany({ where: { userId: user.id } });
        } else {
          const updatedPost = await prisma.post.update({
            where: { id },
            data: { caption, location },
          });
          return [updatedPost];
        }
      } else {
        throw Error(`Oops! There's no post. It couldn't be your post.`);
      }
    },
  },
};
