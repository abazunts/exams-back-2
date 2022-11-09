export type PostMongoDbType = {
  _id: string;
  title: string;
  body: string;
  userId: string;
  __v: number;
};

export type PostOutputType = {
  id: string;
  title: string;
  body: string;
  userId: string;
};

export const convertDbPostsToView = (post: PostMongoDbType): PostOutputType => {
  return {
    id: post._id,
    title: post.title,
    body: post.body,
    userId: post.userId,
  };
};
