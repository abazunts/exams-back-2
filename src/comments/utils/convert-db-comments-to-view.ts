export type CommentMongoDbType = {
  _id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
  __v: number;
};

export type CommentOutputType = {
  id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
};

export const convertDbCommentsToView = (
  comment: CommentMongoDbType,
): CommentOutputType => {
  return {
    id: comment._id,
    postId: comment.postId,
    name: comment.name,
    email: comment.email,
    body: comment.body,
  };
};
