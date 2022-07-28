import { FunctionComponent, useEffect } from "react";
import { fetchArticle } from "../../features/articles/articleSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useRouter } from "next/router";
import { Status } from "../../types/status";
import Loader from "../../components/loader";
import ArticleDetail from "../../features/articles/articleDetail";

const ArticlePage: FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.article.article);
  const articleStatus = useAppSelector((state) => state.article.status);

  const articleId = typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    dispatch(fetchArticle(articleId));
  }, [dispatch, articleId, router]);

  let content: JSX.Element;
  if (articleStatus === Status.Success && article !== null) {
    content = <ArticleDetail article={article} />;
  } else if (articleStatus === Status.Fail) {
    content = <Loader />;
    router.push("/error");
  } else {
    content = <Loader />;
  }

  return content;
};

export default ArticlePage;
