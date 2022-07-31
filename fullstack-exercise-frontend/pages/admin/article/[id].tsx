import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import Loader from "../../../components/loader";
import { editArticle, fetchArticle, postArticle } from "../../../features/articles/articlesSlice";
import CreateOrEditArticle, { ArticleInputs } from "../../../features/articles/createOrEditArticle";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Status } from "../../../types/status";

const EditArticle: FunctionComponent = () => {
  const router = useRouter();
  const { edittedArticle, status: articleUploadStatus } = useAppSelector((state) => state.articles);
  const { article, status: articleStatus } = useAppSelector((state) => state.articles);
  const dispatch = useAppDispatch();

  const articleId = typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    dispatch(fetchArticle(articleId));
  }, [dispatch, articleId, router]);

  async function onEditArticle(data: ArticleInputs) {
    await dispatch(editArticle({ id: articleId, ...data }));
  }

  useEffect(() => {
    if (edittedArticle && articleUploadStatus === Status.Success) {
      router.push(`/article/${edittedArticle.id}`);
    }
  }, [edittedArticle, articleUploadStatus, router]);

  let content: JSX.Element;
  if (articleStatus === Status.Success && article !== null) {
    content = <CreateOrEditArticle mode="edit" onSubmit={onEditArticle} article={article} />;
  } else if (articleStatus === Status.Fail) {
    content = <Loader />;
    router.push("/error");
  } else {
    content = <Loader />;
  }

  return content;
};

export default EditArticle;
