import { FunctionComponent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Article } from "./articleTypes";
import Comment from "./comment";

interface CommentsProps {
  article: Article;
}

type Inputs = {
  message: string;
};

const textAreaHeights = {
  expanded: "146px",
  compact: "74px",
};

const Comments: FunctionComponent<CommentsProps> = ({ article }) => {
  const [textAreaHeight, setTextAreaHeight] = useState(textAreaHeights.compact);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {};

  return (
    <div>
      <h4>Comments ({article.comments.length})</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea
            onFocus={() => setTextAreaHeight(textAreaHeights.expanded)}
            className="w-100 p-2 border rounded"
            style={{ height: textAreaHeight }}
            {...register("message", { required: true })}
            onBlur={() => setTextAreaHeight(textAreaHeights.compact)}
            placeholder="Join the discussion"
          ></textarea>
          {!!errors.message?.message ?? <p className="text-danger">{errors.message?.message}</p>}
        </div>
        <div className="mt-1 d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </div>
      </form>
      {article.comments.map((comment) => {
        return <Comment comment={comment} key={comment.id} />;
      })}
    </div>
  );
};

export default Comments;
