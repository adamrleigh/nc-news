import { Card, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FaNewspaper, FaComments, FaThumbsUp } from "react-icons/fa";

export const UserComp = ({
  user,
  disabled,
  setShowArticles,
  setShowComments,
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        onClick={() => {
          if (!disabled) navigate(`/users/${user.username}`);
        }}
        style={{
          width: "20rem",
          color: "black",
          paddingTop: "5px",
          border: "2px solid black",
        }}
      >
        <Card.Img
          variant="top"
          src={user.avatar_url}
          alt={`${user.username}'s avatar`}
          style={{
            width: "15rem",
            height: "15rem",
            border: "1px solid black",
            borderRadius: "25%",
            alignSelf: "center",
          }}
        />
        <Card.Body>
          <Card.Title>@{user.username}</Card.Title>
          <Card.Text>{user.name}</Card.Text>
          <ButtonGroup size="sm" className="mb-2">
            <Button
              variant="dark"
              onClick={() => {
                if (!user.article_count) return;
                setShowComments(false);
                setShowArticles((curr) => !curr);
              }}
            >
              {user.article_count} <FaNewspaper />
            </Button>
            <Button
              variant="success"
              onClick={() => {
                setShowArticles(false);
                setShowComments((curr) => !curr);
              }}
              disabled={!user.comment_count}
            >
              {user.comment_count} <FaComments />
            </Button>
            <Button variant="primary">
              {user.total_votes} <FaThumbsUp />
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </div>
  );
};
