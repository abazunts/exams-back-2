export type PhotoMongoDbType = {
  _id: string;
  albumId: string;
  title: string;
  url: string;
  __v: number;
};

export type PhotoOutputType = {
  id: string;
  albumId: string;
  title: string;
  url: string;
};
export const convertDbPhotosToView = (
  photo: PhotoMongoDbType,
): PhotoOutputType => {
  return {
    id: photo._id,
    albumId: photo.albumId,
    title: photo.title,
    url: photo.url,
  };
};
