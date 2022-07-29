import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { formatDate } from "../../common/formatDate";
import { ArticleShort } from "./articleTypes";

type ArticlePreviewProps = {
  article: ArticleShort;
};

const ArticlePreview: FunctionComponent<ArticlePreviewProps> = ({ article }) => {
  return (
    <article className="d-flex flex-direction-row mb-3">
      <div className="image-preview-container">
        <Image
          layout="fill"
          objectFit="cover"
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${article.fileName}`}
          alt="Article image"
        ></Image>
      </div>
      <div className="ms-3">
        <h4>{article.title}</h4>
        <div>
          <small className="text-secondary">{article.user.username}</small>
          <span className="mx-2 text-secondary">•</span>
          <small className="text-secondary ">{formatDate(article.createdAt)}</small>
          <p className="mt-2">{article.perex}</p>
          <div className="ms-1">
            <Link href={`article/${article.id}`}>
              <a>
                <small>Read whole article</small>
              </a>
            </Link>
            <small className="ms-2 text-secondary">{article.comments} comments</small>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticlePreview;
