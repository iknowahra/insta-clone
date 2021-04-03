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
        console.log(post);
        const newPost = await prisma.post.findUnique({
          where: {
            id: post.id,
          },
          include: {
            user: true,
            comments: { orderBy: { createdAt: 'desc' } },
            likes: true,
            files: true,
          },
        });

        return {
          ok: true,
          error: null,
          post: newPost,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          error,
          post: null,
        };
      }
    },
  },
};
