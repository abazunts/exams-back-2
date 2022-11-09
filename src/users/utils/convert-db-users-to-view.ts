export type UserMongoDbType = {
  _id: string;
  name: string;
  age: number;
  __v: number;
};

export type UserOutputType = {
  id: string;
  name: string;
  age: number;
};

export const convertDbUsersToView = (user: UserMongoDbType): UserOutputType => {
  return {
    id: user._id,
    name: user.name,
    age: user.age,
  };
};
