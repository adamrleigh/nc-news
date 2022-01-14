import { Offcanvas, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaNewspaper, FaSignOutAlt, FaUtensils, FaUsers } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FaGlobeEurope, FaCode } from "react-icons/fa";
import { FaFutbol } from "react-icons/fa";
import { FaStar, FaAward } from "react-icons/fa";

export const TopicList = ({ topics, showOffCanvas, setShowOffCanvas }) => {
  const { user, setUser } = useContext(UserContext);
  const [showTopics, setShowTopics] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ color: "rgb(255, 0, 0)", fontSize: "25px" }}>
          Northcoders news
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup variant="flush" as="ul">
          <ListGroup.Item>
            <Offcanvas.Title onClick={() => setShowTopics((curr) => !curr)}>
              <FaNewspaper />
              {" Articles"}
            </Offcanvas.Title>
          </ListGroup.Item>
          <div style={{ marginLeft: "30px" }}>
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
                  {<FaGlobeEurope />}
                  {" All articles"}
                </ListGroup.Item>
              </LinkContainer>
              {topics.map((topic) => (
                <LinkContainer
                  to={`/topics/${topic.slug}`}
                  style={{ marginLeft: "20px" }}
                >
                  <ListGroup.Item as="li">
                    {icons[topic.slug]} {topic.slug}
                  </ListGroup.Item>
                </LinkContainer>
              ))}
            </ListGroup>
          </div>
          {user.username && (
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
          )}
          <ListGroup.Item>
            <Offcanvas.Title onClick={() => setShowUserMenu((curr) => !curr)}>
              <FaUsers />
              {" Users"}
            </Offcanvas.Title>
          </ListGroup.Item>
          <div style={{ marginLeft: "30px" }}>
            <ListGroup
              variant="flush"
              as="ul"
              onClick={() => {
                setShowOffCanvas(false);
                setShowUserMenu(false);
              }}
              hidden={!showUserMenu}
            >
              <LinkContainer to={`/users/`}>
                <ListGroup.Item as="li">
                  {<FaGlobeEurope />}
                  {" All users"}
                </ListGroup.Item>
              </LinkContainer>
              <LinkContainer
                to={`/underconstruction`}
                style={{ marginLeft: "20px" }}
              >
                <ListGroup.Item as="li">
                  {<FaStar />}
                  {" Most active"}
                </ListGroup.Item>
              </LinkContainer>
              <LinkContainer
                to={`/underconstruction`}
                style={{ marginLeft: "20px" }}
              >
                <ListGroup.Item as="li">
                  {<FaAward />}
                  {" Highest rated"}
                </ListGroup.Item>
              </LinkContainer>
            </ListGroup>
          </div>
          {user.username && (
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
          )}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
