export default {
  Mutation: {
    uploadPost: async (_, args, { prisma, isAuthenticated, request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, location, files } = args;
      const filesJSON = JSON.parse(files);
      try {
        const post = await prisma.post.create({
          data: {
            caption,
            location,
            user: { connect: { id: user.id } },
          },
        });
        filesJSON.forEach(async file => {
          await prisma.file.create({
            data: {
              url: file.url,
              post: { connect: { id: post.id } },
            },
          });
        });
        return {
          ok: true,
          error: null,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          error,
        };
      }
    },
  },
};
