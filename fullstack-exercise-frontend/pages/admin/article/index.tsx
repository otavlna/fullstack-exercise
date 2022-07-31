import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { postArticle } from "../../../features/articles/articlesSlice";
import { fetchFileUpload } from "../../../features/articles/fileUploadSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Status } from "../../../types/status";

export type ArticleInputs = {
  title: string;
  perex: string;
  content: string;
  fileName: string;
};

const CreateArticle: FunctionComponent = () => {
  const router = useRouter();
  const { fileName, status: fileUploadStatus } = useAppSelector((state) => state.fileUpload);
  const { uploadedArticle, status: articleUploadStatus } = useAppSelector((state) => state.articles);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ArticleInputs>();

  const onSubmit: SubmitHandler<ArticleInputs> = async (data) => {
    if (fileName) {
      await dispatch(postArticle({ ...data, fileName: fileName }));
      if (uploadedArticle && articleUploadStatus === Status.Success) {
        router.push(`/article/${uploadedArticle.id}`);
      }
    }
  };

  function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length) {
      const formData = new FormData();
      formData.append("file", event.target.files[0], event.target.files[0].name);
      dispatch(fetchFileUpload(formData));
    }
  }

  const [previewImage, setPreviewImage] = useState<null | JSX.Element>(null);
  useEffect(() => {
    if (fileName) {
      setPreviewImage(
        <div className="image-upload-preview-image">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${fileName}`}
            alt="Image to be uploaded"
            layout="fill"
            objectFit="cover"
            className="mt-1"
          />
        </div>
      );
    }
  }, [fileName]);

  return (
    <form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex align-items-center mb-3">
        <h1 className="mb-0 me-3">Create new article</h1>
        <Button type="submit">Publish Article</Button>
      </div>

      <div className="col-6">
        <label htmlFor="title" className="d-block mb-1">
          Article title
        </label>
        <input
          id="title"
          className="w-100 p-1 border rounded"
          {...register("title", { required: true })}
          placeholder="My First Article"
        />
        {!!errors.title?.message ?? <p className="text-danger">{errors.title?.message}</p>}
      </div>
      <div className="col-6"></div>

      <div className="my-2">
        <label htmlFor="file" className="d-block mb-1">
          Featured image
        </label>
        <label htmlFor="file" className="btn btn-secondary">
          <input type="file" id="file" className="my-2" onChange={uploadFile} hidden />
          Upload an Image
        </label>
        {previewImage}
      </div>

      <div className="col-6">
        <label htmlFor="perex" className="d-block mb-1">
          Perex
        </label>
        <textarea
          rows={3}
          id="perex"
          className="w-100 p-1 border rounded"
          {...register("perex", { required: true })}
          placeholder="Supports Markdown"
        ></textarea>
        {!!errors.content?.message ?? <p className="text-danger">{errors.content?.message}</p>}
      </div>
      <div className="col-6 mt-3">
        <ReactMarkdown className="">{watch("perex")}</ReactMarkdown>
      </div>

      <div className="col-6">
        <label htmlFor="content" className="d-block mb-1">
          Content
        </label>
        <textarea
          rows={15}
          id="title"
          className="w-100 p-1 border rounded"
          {...register("content", { required: true })}
          placeholder="Supports Markdown"
        ></textarea>
        {!!errors.content?.message ?? <p className="text-danger">{errors.content?.message}</p>}
      </div>
      <div className="col-6 mt-3 overflow-auto">
        <ReactMarkdown className="">{watch("content")}</ReactMarkdown>
      </div>
    </form>
  );
};

export default CreateArticle;
