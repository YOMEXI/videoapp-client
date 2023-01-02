export interface IVideo {
  _id: string;
  userId: string;
  title: string;
  desc: string;
  imgUrl: string;
  videoUrl: string;
  views: number;
  tags: string[];
  likes: any[];
  dislikes: any[];
  createdAt: Date | any;
  updatedAt: Date;
  __v: number;
}
