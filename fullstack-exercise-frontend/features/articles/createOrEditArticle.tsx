import Image from "next/image";
import { FunctionComponent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Article } from "./articleTypes";
import { fetchFileUpload, setFileName } from "./fileUploadSlice";

interface CreateOrEditArticleProps {
  mode: "create" | "edit";
  article?: Article;
  onSubmit: (articleInputs: ArticleInputs) => void;
}

export type ArticleInputs = {
  title: string;
  perex: string;
  content: string;
  fileName: string;
  id?: number;
};

const CreateOrEditArticle: FunctionComponent<CreateOrEditArticleProps> = ({ mode, article, onSubmit }) => {
  const [didClickSend, setDidClickSend] = useState(false);
  const { fileName, status: fileUploadStatus } = useAppSelector((state) => state.fileUpload);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ArticleInputs>();

  const onFormSubmit: SubmitHandler<ArticleInputs> = async (data) => {
    if (fileName) {
      onSubmit({ ...data, fileName: fileName });
    }
  };

  useEffect(() => {
    if (mode === "edit" && article) {
      const fieldsToSet = ["title", "perex", "content"] as const;
      fieldsToSet.forEach((prop) => {
        setValue(prop, article[prop]);
      });
      dispatch(setFileName(article.fileName));
    }
  }, [article, mode, setValue, dispatch]);

  function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length) {
      const formData = new FormData();
      formData.append("file", event.target.files[0], event.target.files[0].name);
      dispatch(fetchFileUpload(formData));
    }
  }

  // render correct preview image
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
  useEffect(() => {
    if (article && article.fileName) {
      setPreviewImage(
        <div className="image-upload-preview-image">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${article.fileName}`}
            alt="Image to be uploaded"
            layout="fill"
            objectFit="cover"
            className="mt-1"
          />
        </div>
      );
    }
  }, [mode, article]);

  return (
    <form className="row" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="d-flex align-items-center mb-3">
        <h1 className="mb-0 me-3">{mode === "create" ? "Create new article" : "Edit article"}</h1>
        <Button type="submit" onClick={() => setDidClickSend(true)}>Publish Article</Button>
      </div>

      <div className="col-6">
        <label htmlFor="title" className="d-block mb-1">
          Article title
        </label>
        <input
          id="title"
          className="w-100 p-1 border rounded"
          {...register("title", {
            required: "Required",
            minLength: { value: 10, message: "Min 10 characters" },
            maxLength: { value: 60, message: "Max 60 characters" },
          })}
          placeholder="My First Article"
        />
        {errors.title && <p className="text-danger">{errors.title?.message}</p>}
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
        {!fileName && didClickSend && <p className="text-danger">File missing</p>}
      </div>

      <div className="col-6">
        <label htmlFor="perex" className="d-block mb-1">
          Perex
        </label>
        <textarea
          rows={3}
          id="perex"
          className="w-100 p-1 border rounded"
          {...register("perex", {
            required: "Required",
            minLength: { value: 10, message: "Min 10 characters" },
            maxLength: { value: 300, message: "Max 300 characters" },
          })}
          placeholder="Supports Markdown"
        ></textarea>
        {errors.perex && <p className="text-danger">{errors.perex?.message}</p>}
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
          {...register("content", {
            required: "Required",
            minLength: { value: 10, message: "Min 10 characters" },
            maxLength: { value: 5000, message: "Max 5000 characters" },
          })}
          placeholder="Supports Markdown"
        ></textarea>
        {errors.content && <p className="text-danger">{errors.content?.message}</p>}
      </div>
      <div className="col-6 mt-3 overflow-auto">
        <ReactMarkdown className="">{watch("content")}</ReactMarkdown>
      </div>
    </form>
  );
};

export default CreateOrEditArticle;
