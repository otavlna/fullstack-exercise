import { User } from "../users/userTypes";
import { Comment } from "../comments/commentTypes";

export type ArticleShort = {
  title: string;
  perex: string;
  content: string;
  fileName: string;
  id: number;
  createdAt: string;
  userId: number;
};

export type Article = {
  title: string;
  perex: string;
  content: string;
  fileName: string;
  id: number;
  createdAt: string;
  comments: Comment[];
  userId: number;
  user: User;
};
