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
      const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          userName,
          email,
          firstName,
          lastName,
          bio,
          avatar,
        },
      });
      return user;
    },
  },
};
