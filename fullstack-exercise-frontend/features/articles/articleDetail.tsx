import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { formatDate } from "../../common/formatDate";
import { Article } from "./articleTypes";
import ReactMarkdown from "react-markdown";
import Comments from "../comments/comments";
import ArticleDetailAside from "./articleDetailAside";

interface ArticleDetailProps {
  article: Article;
}

const ArticleDetail: FunctionComponent<ArticleDetailProps> = ({ article }) => {
  return (
    <main className="row g-4">
      <article className="col-8">
        <h1>{article.title}</h1>
        <div>
          <small className="text-secondary">{article.user.username}</small>
          <span className="mx-2 text-secondary">•</span>
          <small className="text-secondary">{formatDate(article.createdAt)}</small>
        </div>
        <ReactMarkdown className="mt-2 mb-1">{article.perex}</ReactMarkdown>
        <div className="image-detail-container mt-3">
          <Image
            layout="fill"
            objectFit="cover"
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${article.fileName}`}
            alt="Article image"
          ></Image>
        </div>
        <ReactMarkdown className="mt-3">{article.content}</ReactMarkdown>
        <hr />
        <Comments article={article} />
      </article>
      <ArticleDetailAside />
    </main>
  );
};

export default ArticleDetail;
