export default {
  Mutation: {
    createAccount: async (_, args, { prisma }) => {
      const {
        userName,
        email,
        firstName = '',
        lastName = '',
        bio = '',
        avatar = '',
      } = args;
      const user = await prisma.user.create({
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
