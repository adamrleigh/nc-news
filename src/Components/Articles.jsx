import { useState, useEffect } from "react";
import { Form, Row } from "react-bootstrap";
import { fetchArticles } from "../Utils/api";
import { ArticlePreview } from "./ArticlePreview";
import { LoadingSpinner } from "./LoadingSpinner";
import { Error } from "../pages/Error";
import { AddArticleButton } from "../Components/AddArticleButton";
import { PaginationButtons } from "./Pagination";
import { useSearchParams } from "react-router-dom";

export const Articles = ({ topic, author, hideAddButton }) => {
  const [articles, setArticles] = useState([]);
  const [topicError, setTopicError] = useState(false);
  const [orderBy, setOrderBy] = useState("desc");
  const [loading, setLoading] = useState(true);

  const [totalCount, setTotalCount] = useState(0);

  const [searchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState(
    searchParams.get("sort") || "created_at"
  );
  const [page, setPage] = useState(Number(searchParams.get("p")) || 1);

  const LIMIT = 5;

  console.log(page);

  useEffect(async () => {
    try {
      const { articles, total_count } = await fetchArticles({
        limit: LIMIT,
        p: page,
        topic: topic,
        sort_by: sortBy,
        order: orderBy,
      });
      if (author)
        setArticles(articles.filter((article) => article.author === author));
      else setArticles(articles);
      setTotalCount(total_count);
      setTopicError(false);
      setLoading(false);
    } catch {
      setTopicError(true);
      setLoading(false);
    }
  }, [topic, sortBy, orderBy, page]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!hideAddButton && <AddArticleButton />}
          {articles.length ? (
            <>
              <Form
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
              </Form>
              <Row lg={1} className="g-4">
                {articles.map((article) => (
                  <ArticlePreview article={article} setArticles={setArticles} />
                ))}
              </Row>
              <PaginationButtons
                page={page}
                setPage={setPage}
                limit={LIMIT}
                totalCount={totalCount}
              />
              <p>Page: {page}</p>
            </>
          ) : (
            <>
              {page === 1 ? (
                <h4>No articles found</h4>
              ) : (
                <h4>Fix pagination</h4>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
