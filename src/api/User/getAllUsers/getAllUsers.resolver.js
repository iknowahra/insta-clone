export default {
  Query: {
    getAllUsers: async (_, args, context) => {
      return await context.prisma.user.findMany();
    },
  },
};
