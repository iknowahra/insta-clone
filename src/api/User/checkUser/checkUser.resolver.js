export default {
  Query: {
    checkUser: async (_, args, { prisma }) => {
      const { email, userName } = args;
      try {
        const user = await prisma.user.findMany({
          where: {
            AND: [{ email }, { userName }],
          },
        });
        console.log(user.length);
        if (!user.length) {
          return {
            ok: true,
            error: null,
          };
        } else {
          return {
            ok: null,
            error: 'Taken',
          };
        }
      } catch (error) {
        return {
          ok: null,
          error: 'network error',
        };
      }
    },
  },
};
