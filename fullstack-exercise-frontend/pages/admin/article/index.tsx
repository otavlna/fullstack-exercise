import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { postArticle } from "../../../features/articles/articlesSlice";
import CreateOrEditArticle, { ArticleInputs } from "../../../features/articles/createOrEditArticle";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Status } from "../../../types/status";

const CreateArticle: FunctionComponent = () => {
  const router = useRouter();
  const { uploadedArticle, status: articleUploadStatus } = useAppSelector((state) => state.articles);
  const dispatch = useAppDispatch();

  async function createArticle(data: ArticleInputs) {
    await dispatch(postArticle(data));
  }

  useEffect(() => {
    if (uploadedArticle && articleUploadStatus === Status.Success) {
      router.push(`/article/${uploadedArticle.id}`);
    }
  }, [uploadedArticle, articleUploadStatus, router]);

  return <CreateOrEditArticle mode="create" onSubmit={createArticle} />;
};

export default CreateArticle;
