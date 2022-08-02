import { FunctionComponent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Status } from "../../types/status";
import { postComment, refetched } from "./commentsSlice";
import { addVote, fetchArticle } from "../articles/articlesSlice";
import { Article } from "../articles/articleTypes";
import Comment from "./comment";
import { io, Socket } from "socket.io-client";
import { VoteNew, VoteRes, VoteTypes } from "./commentTypes";

interface CommentsProps {
  article: Article;
}

export type CommentInputs = {
  content: string;
  articleId: number;
};

const Comments: FunctionComponent<CommentsProps> = ({ article }) => {
  const dispatch = useAppDispatch();
  const { status, needsRefetch } = useAppSelector((state) => state.comments);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CommentInputs>();

  const onSubmit: SubmitHandler<CommentInputs> = async (data) => {
    await dispatch(postComment({ ...data, articleId: article.id }));
  };

  useEffect(() => {
    if (status === Status.Success && needsRefetch) {
      reset();
      dispatch(refetched());
      dispatch(fetchArticle(article.id));
    }
  }, [status, needsRefetch, article, reset, dispatch]);

  const [connected, setConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<null | Socket>(null);
  useEffect((): any => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL as string;
    const socket = io(url);
    setSocket(socket);
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("newVote", (vote: VoteRes) => {
      dispatch(addVote(vote));
    });

    if (socket) return () => socket.disconnect();
  }, [dispatch]);

  function onVote(vote: VoteNew) {
    socket?.emit("newVote", vote, (vote: VoteRes) => {
      dispatch(addVote(vote));
    });
  }

  return (
    <div>
      <h4>Comments ({article.comments.length})</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea
            style={{ height: "146px" }}
            className="w-100 p-2 border rounded"
            {...register("content", { required: true })}
            placeholder="Join the discussion"
          ></textarea>
          {!!errors.content?.message ?? <p className="text-danger">{errors.content?.message}</p>}
        </div>
        <div className="mt-1 d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </div>
      </form>
      {article.comments.map((comment) => {
        return <Comment comment={comment} key={comment.id} onVote={onVote} />;
      })}
    </div>
  );
};

export default Comments;
