export default {
  Mutation: {
    confirmSecret: async (_, args, { prisma }) => {
      const { email, secret } = args;
      const user = await prisma.user.findOne({ where: { email } });
      if (user.loginSecret === secret) {
        const updateUser = await prisma.user.update({
          where: { email },
          data: { loginSecret: '', confirmSecret: true },
        });
        return updateUser;
      } else {
        throw Error('wrong email/secret combination');
      }
    },
  },
};
