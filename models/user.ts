export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  subscribers: number;
  img?: string;
  subscribedUsers: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
