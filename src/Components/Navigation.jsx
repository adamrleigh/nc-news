import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Dropdown, NavDropdown, Offcanvas } from "react-bootstrap";
import { FaBars, FaUserCircle, FaSignInAlt } from "react-icons/fa";
import { TopicList } from "./TopicList";
import { useState } from "react";
import { UserList } from "./UserList";
import { NavbarLogin } from "./NavbarLogin";
import { useNavigate } from "react-router";

export const Navigation = ({ topics }) => {
  const { user, setUser } = useContext(UserContext);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [showUserPage, setShowUserPage] = useState(false);

  const handleClose = () => setShowOffCanvas(false);
  const handleOpen = () => setShowOffCanvas(true);

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
                Northcoders news
              </Navbar.Brand>
            </LinkContainer>
            <TopicList
              topics={topics}
              showOffCanvas={showOffCanvas}
              setShowOffCanvas={setShowOffCanvas}
            />
            {/* <NavDropdown
              id="nav-dropdown-dark-example"
              title="Topics"
              menuVariant="light"
            >
              <Dropdown.Header>Articles</Dropdown.Header>
              <LinkContainer to="/">
                <NavDropdown.Item>All</NavDropdown.Item>
              </LinkContainer>
              {topics.map((topic) => (
                <LinkContainer to={`/topics/${topic.slug}`}>
                  <NavDropdown.Item>{topic.slug}</NavDropdown.Item>
                </LinkContainer>
              ))}
              <NavDropdown.Divider />
              <Dropdown.Header>Account</Dropdown.Header>
              {!user.username ? (
                <>
                  <LinkContainer to="/login">
                    <NavDropdown.Item>Login</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <NavDropdown.Item>Register</NavDropdown.Item>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to={`/users/${user.username}`}>
                    <NavDropdown.Item>{user.username}</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={() => setUser("")}>
                    Logout
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown> */}
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

// Graveyard

//     return (
// <Navbar bg="light" variant="light" style={{marginTop: "10px", border: "1px solid black"}}>
//     <Container>
//       <Nav className="me-auto">
//         <Dropdown>
//           <Navbar.Brand style={{paddingRight: "15px", borderRight: "1px solid red", color: "rgb(255,8,0)"}}>Northcoders news</Navbar.Brand>
//     <Dropdown.Menu>
//       <Dropdown.Item eventKey="1">Red</Dropdown.Item>
//       <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
//       <Dropdown.Item eventKey="3" active>
//         Orange
//       </Dropdown.Item>
//       <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
//     </Dropdown.Menu>
//     </Dropdown>
//     <>
//     {topics.map(topic =>
//       <LinkContainer
//       to={`/topics/${topic.slug}`}
//       >
//         <Nav.Link>{topic.slug}</Nav.Link>
//       </LinkContainer>
//       )}
//     </>
//     </Nav>
//     <Nav>
//       {!user.username ?
//       <>
//       <LinkContainer to="/login">
//         <Nav.Link>Login</Nav.Link>
//       </LinkContainer>
//       <LinkContainer to="/register">
//         <Nav.Link>Register</Nav.Link>
//       </LinkContainer>
//       </>
//       : <>
//       <LinkContainer to={`/users/${user.username}`}>
//         <Nav.Link>{user.username}</Nav.Link>
//       </LinkContainer>
//       <Nav.Link onClick={() => setUser("")}>Logout</Nav.Link>
//       </>
// }
//     </Nav>
//     </Container>
//   </Navbar>
//     )
