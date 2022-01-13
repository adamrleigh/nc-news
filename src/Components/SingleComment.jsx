import { Button, Card } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { fetchArticleById, fetchUser, getDate, getTime } from "../Utils/api";
import { LikeButton } from "./LikeButton";
import { LoadingSpinner } from "./LoadingSpinner";
import { useContext, useEffect, useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { LinkContainer } from "react-router-bootstrap";
import { likeComment } from "../Utils/api";

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

  // const addLike = async () => {
  //         setCommentLikes(curr=>curr+1);
  //         try {
  //         await likeComment(comment.comment_id);
  //         }
  //         catch{
  //             setCommentLikes(curr=>curr-1);
  //         }
  //     }

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
        <Card color="white" bg="success" style={{ border: `${border}` }}>
          {isProfile ? (
            <LinkContainer to={`/articles/${comment.article_id}`}>
              <Card.Header color="orange">{article.title}</Card.Header>
            </LinkContainer>
          ) : (
            <LinkContainer to={`/users/${comment.author}`}>
              <Card.Header>
                @{comment.author}
                <br></br>
                <img
                  src={commenter.avatar_url}
                  style={{ width: "40px", height: "40px" }}
                ></img>
              </Card.Header>
            </LinkContainer>
          )}
          <Card.Body>
            <Card.Text>{comment.body}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <LikeButton
              votes={commentLikes}
              comment_id={comment.comment_id}
              disabled={isProfile}
            />
            <br></br>
            <DeleteButton
              comment={comment}
              setComments={setComments}
              setCommentCount={setCommentCount}
            />
            <br></br>
            <small className="mb-2 text-white-50" color="">
              {getDate(comment.created_at)} - {getTime(comment.created_at)}
            </small>
          </Card.Footer>
        </Card>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
