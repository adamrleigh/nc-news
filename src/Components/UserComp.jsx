import { Card, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FaNewspaper, FaComments, FaThumbsUp } from "react-icons/fa";

export const UserComp = ({
  user,
  disabled,
  setShowArticles,
  setShowComments,
  small,
  articleCount,
  commentCount,
}) => {
  const navigate = useNavigate();

  if (!small)
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
            {disabled ? (
              <ButtonGroup size="sm" className="mb-2">
                <Button
                  variant="dark"
                  onClick={() => {
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
                >
                  {user.comment_count} <FaComments />
                </Button>
                <Button variant="primary" disabled>
                  {user.total_votes} <FaThumbsUp />
                </Button>
              </ButtonGroup>
            ) : null}
          </Card.Body>
        </Card>
      </div>
    );

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
          width: "10rem",
          height: "9rem",
          color: "black",
        }}
      >
        <Card.Img
          variant="top"
          src={user.avatar_url}
          alt={`${user.username}'s avatar`}
          style={{
            width: "5rem",
            height: "5rem",
            border: "1px solid black",
            borderRadius: "25%",
            alignSelf: "center",
          }}
        />
        <Card.Body>
          <Card.Title style={{ fontSize: "1rem" }}>@{user.username}</Card.Title>
          <Card.Text>{user.name}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

//  return (
//    <Card bg="light" variant="light">
//      <h6>{user.name}</h6>
//      {!disabled ? (
//        <LinkContainer to={`/users/${user.username}`}>
//          <h6>@{user.username}</h6>
//        </LinkContainer>
//      ) : (
//        <h6>@{user.username}</h6>
//      )}
//      <img
//        src={user.avatar_url}
//        style={{ height: "50px", width: "50px", alignSelf: "center" }}
//        alt={`${user.username}'s avatar`}
//      ></img>
//    </Card>
//  );
