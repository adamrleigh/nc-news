import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

export const AddArticleButton = ({ hide }) => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user.username && !hide ? (
        <LinkContainer to="/newarticle">
          <Nav className="justify-content-start">
            <Nav.Link>
              <Nav.Item>Date</Nav.Item>
            </Nav.Link>
          </Nav>
        </LinkContainer>
      ) : null}
    </>
  );
};
