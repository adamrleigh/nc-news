import { ButtonGroup, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { fetchUser, getDate } from "../Utils/api";
import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

export const ArticlePreview = ({ article, page, setTopic, setArticles }) => {
  const { user } = useContext(UserContext);
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();

  const ownArticle = article.author === user.username;
  const border = (ownArticle && "5px solid red") || "";

  useEffect(async () => {
    try {
      const {
        user: { avatar_url },
      } = await fetchUser(article.author);
      setAvatar(avatar_url);
    } catch (err) {
      console.log(err);
    }
  }, [page, navigate]);

  return (
    <Card bg="dark" text="white" style={{ border: `${border}` }}>
      <LinkContainer to={`/topics/${article.topic}`}>
        <Card.Header className="text-muted" bg="info">
          {article.topic}
        </Card.Header>
      </LinkContainer>
      <Card.Body>
        <LinkContainer to={`/articles/${article.article_id}`}>
          <Card.Title>
            <strong>{article.title}</strong>
          </Card.Title>
        </LinkContainer>
      </Card.Body>
      <Card.Footer>
        <div className="d-grid gap-1">
          <small onClick={() => navigate(`/users/${article.author}`)}>
            @{article.author}
            <br></br>
            <img
              src={avatar}
              alt={`${article.authors}'s avatar'`}
              style={{ width: "40px", height: "40px" }}
            />
          </small>
          <br></br>
          <small className="text-muted">{getDate(article.created_at)}</small>
        </div>
      </Card.Footer>
      <div className="d-grid gap-1">
        <ButtonGroup size="md" disabled>
          <CommentButton comments={article.comment_count} />
          <LikeButton votes={article.votes} />
        </ButtonGroup>
      </div>
    </Card>
  );
};
