import { useState, useEffect } from "react";
import { Form, Row, Nav } from "react-bootstrap";
import { fetchArticles, fetchUserArticles } from "../Utils/api";
import { ArticlePreview } from "./ArticlePreview";
import { LoadingSpinner } from "./LoadingSpinner";
import { Error } from "../pages/Error";
import { AddArticleButton } from "../Components/AddArticleButton";
import { PaginationButtons } from "./Pagination";
import { useSearchParams } from "react-router-dom";
import { FaSort } from "react-icons/fa";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { useNavigate } from "react-router";
import { NavDropdown } from "react-bootstrap";
import { useParams } from "react-router";

export const Articles = ({ topic, author, hideAddButton }) => {
  const [articles, setArticles] = useState([]);
  const [topicError, setTopicError] = useState(false);
  const [orderBy, setOrderBy] = useState("desc");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState(
    searchParams.get("sort") || "created_at"
  );
  const [page, setPage] = useState(Number(searchParams.get("p")) || 1);

  const toggleOrder = () => {
    if (orderBy === "asc") setOrderBy("desc");
    else setOrderBy("asc");
    setPage(1);
  };

  const sortByLookup = {
    created_at: "Date",
    votes: "Likes",
    comment_count: "Comments",
  };

  const sortTitle = (
    <>
      <FaSort />
      {sortByLookup[sortBy]}
    </>
  );

  console.log(articles);

  const LIMIT = 5;

  useEffect(async () => {
    const requestBody = {
      limit: LIMIT,
      p: page,
      topic: topic,
      sort_by: sortBy,
      order: orderBy,
    };
    try {
      const { articles } = !hideAddButton
        ? await fetchArticles(requestBody)
        : await fetchUserArticles(author, requestBody);
      setArticles(articles);
      setTopicError(false);
      setLoading(false);
    } catch {
      console.log(!hideAddButton, fetchUserArticles, requestBody);
      setTopicError(true);
      setLoading(false);
    }
  }, [topic, sortBy, orderBy, page, searchParams, navigate]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {articles.length && (
            <Nav className="justify-content-end" activeKey="/home">
              <NavDropdown title={sortTitle} id="nav-dropdown">
                <NavDropdown.Item>
                  <strong>{sortByLookup[sortBy]}</strong>
                </NavDropdown.Item>
                {Object.keys(sortByLookup).map((sortKey) => (
                  <NavDropdown.Item
                    onClick={() => {
                      setSortBy(sortKey);
                      setPage(1);
                    }}
                    hidden={sortKey === sortBy}
                  >
                    {sortByLookup[sortKey]}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Item>
                <Nav.Link onClick={toggleOrder}>
                  {orderBy === "desc" ? (
                    <FaSortAmountDown />
                  ) : (
                    <FaSortAmountUp />
                  )}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          )}
          {articles.length ? (
            <>
              <Row lg={1} className="g-4">
                {articles.map((article) => (
                  <ArticlePreview article={article} setArticles={setArticles} />
                ))}
              </Row>
              <br></br>
              <PaginationButtons
                page={page}
                setPage={setPage}
                limit={LIMIT}
                totalCount={articles[0].total_count}
              />
            </>
          ) : (
            <>
              (<h4>No articles found</h4>)
            </>
          )}
        </>
      )}
    </>
  );
};

//

{
  /* <Form
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setPage(1);
                }}
              >
                <Form.Label>Sort by: </Form.Label>
                <div key={`inline-radio`} className="mb-3">
                  <Form.Check
                    inline
                    label="Date"
                    value="created_at"
                    name="group1"
                    type="radio"
                    id={`inline-1`}
                    checked={sortBy === "created_at"}
                  />
                  <Form.Check
                    inline
                    label="Likes"
                    value="votes"
                    name="group1"
                    type="radio"
                    id={`inline-2`}
                    checked={sortBy === "votes"}
                  />
                  <Form.Check
                    inline
                    label="Comments"
                    value="comment_count"
                    name="group1"
                    type="radio"
                    id={`inline-radio-3`}
                    checked={sortBy === "comment_count"}
                  />
                </div>
              </Form>
              <Form
                onChange={(event) => {
                  setOrderBy(event.target.value);
                  setPage(1);
                }}
              >
                <Form.Label>Order by: </Form.Label>
                <div key={`inline-radio-2`} className="mb-3">
                  <Form.Check
                    inline
                    label="Descending"
                    value="desc"
                    name="group2"
                    type="radio"
                    id="inline-order-desc"
                  />
                  <Form.Check
                    inline
                    label="Ascending"
                    value="asc"
                    name="group2"
                    type="radio"
                    id="inline-order-asc"
                  />
                </div>
              </Form> */
}
