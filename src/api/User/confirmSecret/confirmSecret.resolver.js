export default {
  Mutation: {
    confirmSecret: async (_, args, { prisma }) => {
      const { email, secret } = args;
      const user = await prisma.user.findUnique({ where: { email } });
      if (user.loginSecret === secret) {
        const updateUser = await prisma.user.update({
          where: { email },
          data: { loginSecret: '', confirmSecret: true },
        });
        return {
          ok: true,
          error: null,
        };
      } else {
        return {
          ok: false,
          error: 'wrong email/secret combination',
        };
      }
    },
  },
};
