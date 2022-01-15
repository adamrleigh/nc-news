import { Card } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { fetchArticleById, fetchUser, getDate, getTime } from "../Utils/api";
import { LikeButton } from "./LikeButton";
import { LoadingSpinner } from "./LoadingSpinner";
import { useContext, useEffect, useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { LinkContainer } from "react-router-bootstrap";

export const SingleComment = ({
  comment,
  isProfile,
  setComments,
  setCommentCount,
}) => {
  const { user } = useContext(UserContext);
  const [article, setArticle] = useState({});
  const [commenter, setCommenter] = useState({});
  const [commentLikes, setCommentLikes] = useState(
    (comment && comment.votes) || 0
  );

  const ownComment = comment && user.username === comment.author;
  const border = (ownComment && "2px solid red") || "";

  useEffect(async () => {
    if (comment && isProfile) {
      const { article: commentArticle } = await fetchArticleById(
        comment.article_id
      );
      setArticle(commentArticle);
    } else if (comment) {
      const { user: commenter } = await fetchUser(comment.author);
      setCommenter(commenter);
    }
  }, []);

  return (
    <>
      {comment ? (
        <Card color="black" bg="white" style={{ border: `${border}` }}>
          {isProfile ? (
            <LinkContainer to={`/articles/${comment.article_id}`}>
              <Card.Header color="black">
                <strong>{article.title}</strong>
              </Card.Header>
            </LinkContainer>
          ) : (
            <LinkContainer to={`/users/${comment.author}`}>
              <Card.Header>
                <strong>@{comment.author}</strong>
                <br></br>
                <img
                  src={commenter.avatar_url}
                  style={{ width: "40px", height: "40px" }}
                  alt={`${commenter.username}'s avatar`}
                />
              </Card.Header>
            </LinkContainer>
          )}
          <Card.Body>
            <Card.Text>{comment.body}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <DeleteButton
              comment={comment}
              setComments={setComments}
              setCommentCount={setCommentCount}
            />
            <small className="mb-2 text-muted" color="">
              {getDate(comment.created_at)} - {getTime(comment.created_at)}
            </small>
          </Card.Footer>
          <LikeButton
            votes={commentLikes}
            comment_id={comment.comment_id}
            disabled={isProfile}
          />
        </Card>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
