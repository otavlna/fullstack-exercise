import { FunctionComponent, useEffect } from "react";
import ArticlePreview from "../features/articles/articlePreview";
import { fetchArticles } from "../features/articles/articlesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const ArticlesPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.articles.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <main>
      <h1> Recent Articles</h1>
      <div>
        {articles.map((article) => (
          <ArticlePreview article={article} key={article.id} />
        ))}
      </div>
    </main>
  );
};

export default ArticlesPage;
