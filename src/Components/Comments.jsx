import { useState, useEffect, useContext } from "react";
import { fetchComments, fetchUserComments } from "../Utils/api";
import { SingleComment } from "./SingleComment";
import { Button, ButtonGroup, Row } from "react-bootstrap";
import { AddComment } from "./AddComment";
import { FaPencilAlt } from "react-icons/fa";
import { UserContext } from "../contexts/UserContext";

export const Comments = ({
  article_id,
  username,
  setCommentCount,
  commentCount,
  disabled,
}) => {
  const [comments, setComments] = useState([]);
  const [showAddComment, setShowAddComment] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  console.log(comments);

  useEffect(async () => {
    try {
      const { comments } = article_id
        ? await fetchComments(article_id)
        : await fetchUserComments(username);
      setComments(comments);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [commentCount]);

  console.log(commentCount, setCommentCount);

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
              <FaPencilAlt />
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
          {comments.length ? (
            <Row lg={1} className="g-4">
              {comments.map((comment) =>
                !article_id ? (
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
                )
              )}
            </Row>
          ) : (
            <h4>No comments found</h4>
          )}
        </>
      )}
    </>
  );
};
