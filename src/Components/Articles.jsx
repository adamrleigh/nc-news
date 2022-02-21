import { useState, useEffect } from "react";
import { Row, Nav } from "react-bootstrap";
import { fetchArticles, fetchUserArticles } from "../Utils/api";
import { ArticlePreview } from "./ArticlePreview";
import { LoadingSpinner } from "./LoadingSpinner";
import { PaginationButtons } from "./Pagination";
import { useSearchParams } from "react-router-dom";
import { FaSort } from "react-icons/fa";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { useNavigate } from "react-router";
import { NavDropdown } from "react-bootstrap";

export const Articles = ({ topic, author, hideAddButton }) => {
  const LIMIT = 5;
  const [articles, setArticles] = useState([]);
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

  useEffect(() => {
    const requestBody = {
      limit: LIMIT,
      p: page,
      topic: topic,
      sort_by: sortBy,
      order: orderBy,
    };

    (async () => {
      try {
        const { articles } = !hideAddButton
          ? await fetchArticles(requestBody)
          : await fetchUserArticles(author, requestBody);
        setArticles(articles);
        setLoading(false);
      } catch {
        console.log(!hideAddButton, fetchUserArticles, requestBody);
        setLoading(false);
      }
    })();
  }, [
    topic,
    sortBy,
    orderBy,
    page,
    searchParams,
    navigate,
    author,
    hideAddButton,
  ]);

  useEffect(() => {
    setPage(1);
  }, [topic, sortBy, orderBy, searchParams, navigate]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {articles.length > 0 && (
            <Nav className="justify-content-end">
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
                    key={sortKey}
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
                  <div key={`${article.article_id}`}>
                    <ArticlePreview
                      page={page}
                      article={article}
                      setArticles={setArticles}
                    />
                  </div>
                ))}
              </Row>
              <PaginationButtons
                page={page}
                setPage={setPage}
                limit={LIMIT}
                totalCount={articles[0].total_count}
              />
            </>
          ) : (
            <>
              <h4>No articles found</h4>
            </>
          )}
        </>
      )}
    </>
  );
};
