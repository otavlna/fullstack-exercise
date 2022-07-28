import Image from "next/image";
import { FunctionComponent } from "react";
import { formatDate } from "../../common/formatDate";
import { Article } from "./articleTypes";

interface ArticleDetailProps {
  article: Article;
}

const ArticleDetail: FunctionComponent<ArticleDetailProps> = ({ article }) => {
  return (
    <main className="row g-5">
      <article className="col-8">
        <h1>{article.title}</h1>
        <div>
          <small className="text-secondary">{article.user.username}</small>
          <small className="text-secondary ms-2">{formatDate(article.createdAt)}</small>
        </div>
        <div className="image-detail-container mt-3">
          <Image
            layout="fill"
            objectFit="cover"
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${article.fileName}`}
            alt="Article image"
          ></Image>
        </div>
      </article>
      <aside className="col-4">test</aside>
    </main>
  );
};

export default ArticleDetail;
