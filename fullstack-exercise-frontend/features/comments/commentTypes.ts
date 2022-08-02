export type Comment = {
  author: string;
  content: string;
  id: number;
  createdAt: string;
  score: number;
};

export type VoteNew = {
  type: VoteTypes;
  commentId: number;
};

export type VoteRes = {
  score: number;
  commentId: number;
};

export enum VoteTypes {
  Upvote = 1,
  Downvote = -1,
}
