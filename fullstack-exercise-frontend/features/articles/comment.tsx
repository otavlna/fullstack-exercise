import { FunctionComponent } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { formatDate } from "../../common/formatDate";
import { Comment } from "../comments/commentTypes";
import moment from "moment";

interface CommentProps {
  comment: Comment;
}

const Comment: FunctionComponent<CommentProps> = ({ comment }) => {
  return (
    <div className="mb-3">
      <div>
        <span className="fw-bold">{comment.author}</span>
        <small className="text-secondary ms-2">{moment(comment.createdAt).fromNow()}</small>
      </div>
      <p>{comment.content}</p>
      <div>
        <span>{comment.votes ?? 0}</span>
        <div className="vr mx-1"></div>
        <ChevronUp />
        <div className="vr mx-1"></div>
        <ChevronDown />
        <div className="vr mx-1"></div>
      </div>
    </div>
  );
};

export default Comment;
