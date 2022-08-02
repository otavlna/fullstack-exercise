import { FunctionComponent, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { Comment, VoteNew, VoteTypes } from "./commentTypes";
import moment from "moment";
import { useAppDispatch } from "../../store/hooks";

interface CommentProps {
  comment: Comment;
  onVote: (type: VoteNew) => void;
}

const Comment: FunctionComponent<CommentProps> = ({ comment, onVote }) => {
  const [clicked, setClicked] = useState<null | "upvote" | "downvote">(null);

  return (
    <div className="mb-3">
      <div>
        <span className="fw-bold">{comment.author}</span>
        <small className="text-secondary ms-2">{moment(comment.createdAt).fromNow()}</small>
      </div>
      <p>{comment.content}</p>
      <div>
        <span>{comment.score ?? 0}</span>
        <div className="vr mx-1"></div>
        <ChevronUp
          onClick={() => {
            onVote({ type: VoteTypes.Upvote, commentId: comment.id });
            setClicked("upvote");
          }}
          color={clicked === "upvote" ? "red" : "black"}
        />
        <div className="vr mx-1"></div>
        <ChevronDown
          onClick={() => {
            onVote({ type: VoteTypes.Downvote, commentId: comment.id });
            setClicked("downvote");
          }}
          color={clicked === "downvote" ? "blue" : "black"}
        />
        <div className="vr mx-1"></div>
      </div>
    </div>
  );
};

export default Comment;
