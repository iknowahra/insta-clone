export default {
  Mutation: {
    createAccount: async (_, args, context) => {
      const {
        userName,
        email,
        firstName = '',
        lastName = '',
        bio = '',
        avatar = '',
      } = args;
      const user = await context.prisma.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          bio,
          avatar,
        },
      });
      console.log(user);
      return user;
    },
  },
};
