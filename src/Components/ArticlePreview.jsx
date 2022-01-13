import { ButtonGroup, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getDate } from "../Utils/api";
import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { DeleteButton } from "./DeleteButton";

export const ArticlePreview = ({ article, setTopic, setArticles }) => {
  const { user } = useContext(UserContext);

  const ownArticle = article.author === user.username;
  const border = (ownArticle && "5px solid red") || "";

  return (
    <Card bg="dark" text="white" style={{ border: `${border}` }}>
      <LinkContainer to={`/topics/${article.topic}`}>
        <Card.Header className="text-muted" bg="info">
          {article.topic}
        </Card.Header>
      </LinkContainer>
      <Card.Body>
        <LinkContainer to={`/articles/${article.article_id}`}>
          <Card.Title>{article.title}</Card.Title>
        </LinkContainer>
      </Card.Body>
      <Card.Footer>
        <ButtonGroup size="sm" disabled>
          <CommentButton comments={article.comment_count} />
          <LikeButton votes={article.votes} />
        </ButtonGroup>
        <br></br>
        <br></br>
        <DeleteButton article={article} setArticles={setArticles} />
        <br></br>
        <small className="text-muted">{getDate(article.created_at)}</small>
      </Card.Footer>
    </Card>
  );
};
