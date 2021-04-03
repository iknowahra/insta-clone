import _ from 'lodash';
export default {
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
    amIFollowing: async (parent, _, { request, prisma }) => {
      const { user } = request;
      const { id: parentId } = parent; //this way is to re-define parent.id
      try {
        const exist = await prisma.user.count({
          where: {
            AND: [{ id: user.id }, { following: { some: { id: parentId } } }],
          },
        });
        return exist ? true : false;
      } catch (error) {
        return false;
      }
    },
    itsMe: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
    followingCount: async (parent, __, { request, prisma }) => {
      const { id } = parent;
      const following = await prisma.user
        .findUnique({ where: { id } })
        .following();
      return following.length;
    },
    followersCount: async (parent, __, { request, prisma }) => {
      const { id } = parent;
      const followers = await prisma.user
        .findUnique({ where: { id } })
        .followers();
      return followers.length;
    },
    postCount: async (parent, __, { prisma }) => {
      const { id } = parent;
      return await prisma.post.count({ where: { userId: id } });
    },
    friends: async (parent, __, { prisma }) => {
      const { id } = parent;
      const followers = await prisma.user
        .findUnique({ where: { id } })
        .followers();
      const following = await prisma.user
        .findUnique({ where: { id } })
        .following();
      const result = _.uniqBy(followers.concat(following), 'id');
      return result;
    },
  },
  Post: {
    amILiking: async (parent, _, { request, prisma }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        const exist = await prisma.like.count({
          where: {
            AND: [{ userId: user.id }, { postId: parentId }],
          },
        });
        return exist ? true : false;
      } catch (error) {
        return false;
      }
    },
    likeCount: (parent, _, { prisma }) =>
      prisma.like.count({ where: { post: { id: parent.id } } }),
    commentCount: async (parent, _, { prisma }) => {
      const { id: postId } = parent;
      const count = await prisma.comment.count({
        where: { postId },
      });
      return count;
    },
    fileCount: async (parent, _, { prisma }) => {
      const { id: postId } = parent;
      const count = await prisma.file.count({ where: { postId } });
      return count;
    },
  },
  Comment: {
    userName: async (parent, _, { prisma }) => {
      const { userId } = parent;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      return user.userName;
    },
    avatar: async (parent, _, { prisma }) => {
      const { userId } = parent;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      return user.avatar;
    },
  },
};
