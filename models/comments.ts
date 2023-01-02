export interface IComment {
  _id: string;
  userId: string;
  videoId: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
