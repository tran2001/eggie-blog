export interface IBlog {
  _id: string;
  title: string;
  content: string;
  background: string;
  theme: string;
  author: string;
  commentIds: IComment[];
}

export interface IComment {
  _id: string;
  content: string;
  user: IUser;
  time: string;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  password: string;
}