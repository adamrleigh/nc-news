import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaBars } from "react-icons/fa";
import { TopicList } from "./TopicList";
import { useState } from "react";
import { UserList } from "./UserList";
import { NavbarLogin } from "./NavbarLogin";
import { useNavigate } from "react-router";

export const Navigation = ({ topics }) => {
  const { user } = useContext(UserContext);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [showUserPage, setShowUserPage] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Navbar
        fixed="top"
        style={{ backgroundColor: "rgb(200,0,0)", color: "white" }}
        variant="dark"
        id="navbar"
      >
        <Container fluid>
          <Nav>
            <Nav.Link onClick={() => setShowOffCanvas(true)}>
              <FaBars />
            </Nav.Link>
            <LinkContainer
              to="/"
              style={{
                paddingRight: "5px",
                color: "white",
              }}
            >
              <Navbar.Brand className="justify-content-center">
                {"Northcoders news "}
              </Navbar.Brand>
            </LinkContainer>
            <TopicList
              topics={topics}
              showOffCanvas={showOffCanvas}
              setShowOffCanvas={setShowOffCanvas}
            />
          </Nav>
          <Nav.Link
            className="justify-content-end"
            onClick={() => {
              if (!user.username) setShowUserPage(true);
              else navigate(`/users/${user.username}`);
            }}
          >
            <NavbarLogin setShowUserPage={setShowUserPage} />
          </Nav.Link>
          <UserList
            showOffCanvas={showUserPage}
            setShowOffCanvas={setShowUserPage}
          />
        </Container>
      </Navbar>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};
