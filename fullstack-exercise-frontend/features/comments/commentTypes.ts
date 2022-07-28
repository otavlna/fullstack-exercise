export type Comment = {
  author: string;
  content: string;
  id: number;
  createdAt: string;
  votes: VoteTypes[];
};

export enum VoteTypes {
  Upvote = "UPVOTE",
  Downvote = "DOWNVOTE",
}

export type Vote = {
  type: VoteTypes;
  id: number;
};
