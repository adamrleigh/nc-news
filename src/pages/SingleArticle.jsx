import { ButtonGroup, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchArticleById, fetchUser } from "../Utils/api";
import { getDate } from "../Utils/api";
import { Comments } from "../Components/Comments";
import { CommentButton } from "../Components/CommentButton";
import { LikeButton } from "../Components/LikeButton";
import { LinkContainer } from "react-router-bootstrap";
import { Error } from "./Error";
import { useNavigate } from "react-router";
import { DeleteButton } from "../Components/DeleteButton";

export const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [timeStamp, setTimeStamp] = useState("");
  const [articleError, setArticleError] = useState(false);
  const [author, setAuthor] = useState({});
  const [commentCount, setCommentCount] = useState(0);

  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const { article } = await fetchArticleById(article_id);
      const { user: authorUser } = await fetchUser(article.author);
      setArticleError(false);
      setAuthor(authorUser);
      setArticle(article);
      setTimeStamp(getDate(article.created_at));
      setCommentCount(article.comment_count);
    } catch {
      setArticleError(true);
    }
  }, []);

  return (
    <>
      {!articleError ? (
        <>
          <Card bg="dark" text="white" style={{}}>
            <Card.Body>
              <LinkContainer to={`/topics/${article.topic}`}>
                <Card.Subtitle className="mb-2 text-muted">
                  {article.topic}
                </Card.Subtitle>
              </LinkContainer>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.body}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small onClick={() => navigate(`/users/${article.author}`)}>
                @{article.author}
                <br></br>
                <img
                  src={author.avatar_url}
                  alt={`${article.authors}'s avatar'`}
                  style={{ width: "40px", height: "40px" }}
                />
              </small>
              <br></br>
              <DeleteButton article={article} />
              <small className="text-muted">{timeStamp}</small>
            </Card.Footer>
            <ButtonGroup size="md">
              <CommentButton
                setShowComments={setShowComments}
                comments={commentCount}
              />
              <LikeButton
                votes={article.votes}
                article_id={article.article_id}
              />
            </ButtonGroup>
            <br></br>
          </Card>
          <br></br>
          <br></br>
          {showComments ? (
            <Comments
              article_id={article_id}
              setCommentCount={setCommentCount}
              commentCount={commentCount}
            />
          ) : null}
        </>
      ) : (
        <Error thing="Article" />
      )}
    </>
  );
};
