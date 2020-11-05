export default {
  Mutation: {
    editUser: async (_, args, { request, prisma, isAuthenticated }) => {
      isAuthenticated(request);
      const { userName, email, firstName, lastName, bio, avatar } = args;
      const { user } = request;
      return await prisma.user.update({
        where: { id: user.id },
        data: {
          userName,
          email,
          firstName,
          lastName,
          bio,
          avatar,
        },
      });
    },
  },
};
