import { useState, useEffect, useContext } from "react";
import { fetchComments, fetchUserComments } from "../Utils/api";
import { SingleComment } from "./SingleComment";
import { Button, Row } from "react-bootstrap";
import { AddComment } from "./AddComment";
import { FaPencilAlt } from "react-icons/fa";
import { UserContext } from "../contexts/UserContext";
import { PaginationButtons } from "./Pagination";
import { Nav, NavDropdown } from "react-bootstrap";
import { FaSort, FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { useNavigate } from "react-router";

export const Comments = ({
  article_id,
  username,
  setCommentCount,
  commentCount,
}) => {
  const LIMIT = 5;
  const [comments, setComments] = useState([]);
  const [showAddComment, setShowAddComment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState("desc");
  const [sortBy, setSortBy] = useState("created_at");
  const [page, setPage] = useState(1);
  const { user } = useContext(UserContext);

  const toggleOrder = () => {
    if (orderBy === "asc") setOrderBy("desc");
    else setOrderBy("asc");
    setPage(1);
  };

  const sortByLookup = {
    created_at: "Date",
    votes: "Likes",
  };

  const sortTitle = (
    <>
      <FaSort />
      {sortByLookup[sortBy]}
    </>
  );

  const navigate = useNavigate();

  useEffect(() => {
    const requestBody = {
      limit: LIMIT,
      p: page,
      sort_by: sortBy,
      order: orderBy,
    };

    (async () => {
      try {
        const { comments } = article_id
          ? await fetchComments(article_id, requestBody)
          : await fetchUserComments(username, requestBody);
        setComments(comments);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [page, sortBy, orderBy, commentCount, article_id, username]);

  useEffect(() => {
    setPage(1);
  }, [sortBy, orderBy, navigate]);

  return (
    <>
      {loading ? (
        <SingleComment />
      ) : (
        <>
          {article_id && !showAddComment && user.username ? (
            <Button
              variant="warning"
              onClick={() => setShowAddComment((curr) => !curr)}
            >
              Add comment <FaPencilAlt />
            </Button>
          ) : null}
          {showAddComment ? (
            <AddComment
              article_id={article_id}
              setState={setShowAddComment}
              setComments={setComments}
              setCommentCount={setCommentCount}
            />
          ) : null}
          {comments.length !== 0 && (
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
          {comments.length ? (
            <>
              <Row lg={1} className="g-4">
                {comments.map((comment) => (
                  <div key={comment.comment_id}>
                    {!article_id ? (
                      <SingleComment
                        comment={comment}
                        isProfile={true}
                        setComments={setComments}
                        setCommentCount={setCommentCount}
                      />
                    ) : (
                      <SingleComment
                        comment={comment}
                        setComments={setComments}
                        setCommentCount={setCommentCount}
                      />
                    )}
                  </div>
                ))}
              </Row>
              <PaginationButtons
                page={page}
                setPage={setPage}
                limit={LIMIT}
                totalCount={comments[0].total_count}
              />
            </>
          ) : (
            <h4>No comments found</h4>
          )}
        </>
      )}
    </>
  );
};
