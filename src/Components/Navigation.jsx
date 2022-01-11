import { Navbar, Container, Nav } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { FaHome, FaSignInAlt} from 'react-icons/fa';

export const Navigation = ( {topics} ) => {

    const {user, setUser} = useContext(UserContext);


    return (
        <Navbar variant="light" bg="light" style={{border: "2px solid black"}}>
  <Container>
    <Navbar.Toggle aria-controls="navbar-dark-example" />
    <Navbar.Collapse id="navbar-dark-example">
      <Nav>
        <LinkContainer to="/" style={{paddingRight: "5px", borderRight: "1px solid red", color: "rgb(255,8,0)"}}>
    <Navbar.Brand >Northcoders news</Navbar.Brand>
        </LinkContainer>
        <NavDropdown
          id="nav-dropdown-dark-example"
          title="Topics"
          menuVariant="light"
        >
          <Dropdown.Header>Articles</Dropdown.Header>
            <LinkContainer to="/">
              <NavDropdown.Item>All</NavDropdown.Item>
            </LinkContainer>
            {topics.map(topic => 
              <LinkContainer
              to={`/topics/${topic.slug}`}
              >
              <NavDropdown.Item>{topic.slug}</NavDropdown.Item>
              </LinkContainer>
      )}
          <NavDropdown.Divider />
          <Dropdown.Header>Account</Dropdown.Header>
          {!user.username ?
      <>
      <LinkContainer to="/login">
        <NavDropdown.Item>Login</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to="/register">
        <NavDropdown.Item>Register</NavDropdown.Item>
      </LinkContainer>
      </>
      : <>
      <LinkContainer to={`/users/${user.username}`}>
        <NavDropdown.Item>{user.username}</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item onClick={() => setUser("")}>Logout</NavDropdown.Item>
      </>
}
        </NavDropdown>
      <Nav.Link><FaSignInAlt /></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

    )


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
}


