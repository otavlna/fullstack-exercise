export type Comment = {
  author: string;
  content: string;
  id: number;
  createdAt: string;
  votes: number
};

export enum VoteTypes {
  Upvote = "UPVOTE",
  Downvote = "DOWNVOTE",
}