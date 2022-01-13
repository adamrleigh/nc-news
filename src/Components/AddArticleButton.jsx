import { Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaNewspaper } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

export const AddArticleButton = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user.username ? (
        <LinkContainer to="/newarticle">
          <Button variant="warning">
            New article <FaNewspaper />
          </Button>
        </LinkContainer>
      ) : null}
    </>
  );
};
