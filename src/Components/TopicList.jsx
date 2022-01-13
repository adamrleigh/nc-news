import {
  Offcanvas,
  ListGroup,
  NavDropdown,
  OffcanvasHeader,
  ListGroupItem,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  FaNewspaper,
  FaUserCircle,
  FaSignOutAlt,
  FaUtensils,
} from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FaGlobeEurope, FaCode } from "react-icons/fa";
import { FaFutbol } from "react-icons/fa";

export const TopicList = ({ topics, showOffCanvas, setShowOffCanvas }) => {
  const { user, setUser } = useContext(UserContext);
  const [showTopics, setShowTopics] = useState(false);
  const navigate = useNavigate();

  const icons = {
    football: <FaFutbol />,
    coding: <FaCode />,
    cooking: <FaUtensils />,
  };

  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={() => {
        setShowOffCanvas(false);
        setShowTopics(false);
      }}
    >
      <Offcanvas.Body>
        <ListGroup variant="flush" as="ul">
          <ListGroup.Item>
            <Offcanvas.Title onClick={() => setShowTopics((curr) => !curr)}>
              <FaNewspaper />
              {" Articles"}
            </Offcanvas.Title>
          </ListGroup.Item>
          <ListGroup
            variant="flush"
            as="ul"
            onClick={() => {
              setShowOffCanvas(false);
              setShowTopics(false);
            }}
            hidden={!showTopics}
          >
            <LinkContainer to={`/articles/`}>
              <ListGroup.Item as="li">
                {""}
                {<FaGlobeEurope />}
                {" All"}
              </ListGroup.Item>
            </LinkContainer>
            {topics.map((topic) => (
              <LinkContainer to={`/topics/${topic.slug}`}>
                <ListGroup.Item as="li">
                  {icons[topic.slug]} {topic.slug}
                </ListGroup.Item>
              </LinkContainer>
            ))}
          </ListGroup>
          <ListGroup.Item>
            <Offcanvas.Title
              onClick={() => {
                setShowOffCanvas(false);
                navigate(user.username ? "/newarticle" : "/login");
              }}
            >
              <FaPencilAlt />
              {" Add new article"}
            </Offcanvas.Title>
          </ListGroup.Item>
          <ListGroup.Item>
            <Offcanvas.Title
              onClick={() => {
                setShowOffCanvas(false);
                navigate("/users");
              }}
            >
              <FaUserCircle />
              {" Users"}
            </Offcanvas.Title>
          </ListGroup.Item>
          <ListGroup.Item>
            <Offcanvas.Title
              onClick={() => {
                setUser("");
                setShowOffCanvas(false);
                navigate("/");
              }}
            >
              <FaSignOutAlt />
              {" Logout"}
            </Offcanvas.Title>
          </ListGroup.Item>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
