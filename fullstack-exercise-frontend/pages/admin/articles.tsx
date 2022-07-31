import { FunctionComponent, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Edit2, Trash } from "react-feather";
import { fetchMyArticles } from "../../features/articles/articlesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const AdminArticles: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.articles.myArticles);

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
            <Form.Check />
          </td>
          <td>{article.title}</td>
          <td>{article.perex}</td>
          <td>{article.user.username}</td>
          <td>{article.comments}</td>
          <td>
            <div className="d-flex">
              <Edit2 style={{ cursor: "pointer" }} />
              <Trash style={{ cursor: "pointer" }} className="ms-3" />
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <main>
      <div className="d-flex mb-4 align-items-center">
        <h1 className="mb-0 me-3">My articles</h1>
        <Button>Create new article</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>
              <Form.Check />
            </th>
            {tableFilterableHeadings.map((heading) => {
              return <th key={heading} className="text-nowrap">{heading}</th>;
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
