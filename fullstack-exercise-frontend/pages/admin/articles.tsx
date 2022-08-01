import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Edit2, Trash } from "react-feather";
import ConfirmModal from "../../components/confirmModal";
import { deleteArticle, fetchMyArticles } from "../../features/articles/articlesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const AdminArticles: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.articles.myArticles);
  const [dirtyArticleId, setDirtyArticleId] = useState<null | number>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSelectedModal, setShowDeleteSelectedModal] = useState(false);
  const [selectedArticleIds, setSelectedArticleIds] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchMyArticles());
  }, [dispatch]);

  const tableFilterableHeadings = ["Article title", "Perex", "Author", "# of comments"];

  let rows = null;
  if (articles.length) {
    rows = articles.map((article) => {
      return (
        <tr key={article.id}>
          <td>
            <Form.Check
              onChange={() => {
                if (selectedArticleIds.some((id) => id === article.id)) {
                  const newSelectedArticleIds = selectedArticleIds.filter((id) => id !== article.id);
                  setSelectedArticleIds(newSelectedArticleIds);
                } else {
                  setSelectedArticleIds([...selectedArticleIds, article.id]);
                }
              }}
              checked={(() => selectedArticleIds.some((id) => id === article.id))()}
            />
          </td>
          <td>{article.title}</td>
          <td>{article.perex}</td>
          <td>{article.user.username}</td>
          <td>{article.comments}</td>
          <td>
            <div className="d-flex">
              <Link href={`/article/${article.id}`}>
                <Edit2 style={{ cursor: "pointer" }} />
              </Link>
              <Trash
                style={{ cursor: "pointer" }}
                className="ms-3"
                onClick={() => {
                  setDirtyArticleId(article.id);
                  setShowDeleteModal(true);
                }}
              />
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <main>
      <ConfirmModal
        show={showDeleteModal}
        heading="Delete Article"
        body={<p>Are you sure you want to delete this article?</p>}
        onConfirm={async () => {
          if (dirtyArticleId) {
            await dispatch(deleteArticle(dirtyArticleId));
            setShowDeleteModal(false);
            dispatch(fetchMyArticles());
          }
        }}
        onCancel={() => {
          setDirtyArticleId(null);
          setShowDeleteModal(false);
        }}
      />

      <ConfirmModal
        show={showDeleteSelectedModal}
        heading="Delete Selected Articles"
        body={<p>Are you sure you want to delete {selectedArticleIds.length} selected articles?</p>}
        onConfirm={async () => {
          const promises = [];
          for (const id of selectedArticleIds) {
            promises.push(dispatch(deleteArticle(id)));
          }
          await Promise.allSettled(promises);
          setShowDeleteSelectedModal(false);
          dispatch(fetchMyArticles());
        }}
        onCancel={() => {
          setShowDeleteSelectedModal(false);
        }}
      />
      <div className="d-flex mb-4 align-items-center">
        <h1 className="mb-0 me-3">My articles</h1>
        <Link href="/admin/article">
          <Button>Create new article</Button>
        </Link>
        <Button
          onClick={() => {
            setShowDeleteSelectedModal(true);
          }}
          variant="danger"
          className="ms-2"
          disabled={selectedArticleIds.length === 0}
        >
          Delete selected articles
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>
              <Form.Check
                onChange={() => {
                  if (articles.length === selectedArticleIds.length) {
                    setSelectedArticleIds([]);
                  } else {
                    setSelectedArticleIds(articles.map((article) => article.id));
                  }
                }}
              />
            </th>
            {tableFilterableHeadings.map((heading) => {
              return (
                <th key={heading} className="text-nowrap">
                  {heading}
                </th>
              );
            })}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </main>
  );
};

export default AdminArticles;
