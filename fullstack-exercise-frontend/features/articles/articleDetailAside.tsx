import Link from "next/link";
import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchArticles } from "./articlesSlice";

const ArticleDetailAside: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.articles.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <aside className="col-4">
      <div className="ps-4 border-start">
        <h4>Related articles</h4>
        <div className="mt-4">
          {articles.slice(0, 4).map((article) => {
            return (
              <Link href={`/article/${article.id}`} key={article.id}>
                <div style={{ cursor: "pointer" }}>
                  <h6>{article.title}</h6>
                  <p>
                    <small className="mt-1">{article.perex}</small>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default ArticleDetailAside;
