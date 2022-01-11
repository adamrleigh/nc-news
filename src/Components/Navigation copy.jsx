import { Navbar, Container, Nav } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const Navigation = ( {topics} ) => {

    const {user, setUser} = useContext(UserContext);

    return (
<Navbar bg="light" variant="light" style={{marginTop: "10px", border: "1px solid black"}}>
    <Container>
      <Nav className="me-auto">
    <LinkContainer to="/" style={{paddingRight: "15px", borderRight: "1px solid red", color: "rgb(255,8,0)"}}>  
    <Navbar.Brand >Northcoders news</Navbar.Brand>
    </LinkContainer>
    <>
    {topics.map(topic => 
      <LinkContainer
      to={`/topics/${topic.slug}`}
      >
        <Nav.Link>{topic.slug}</Nav.Link>
      </LinkContainer>
      )}
    </>
    </Nav>
    <Nav>
      {!user.username ?
      <>
      <LinkContainer to="/login">
        <Nav.Link>Login</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/register">
        <Nav.Link>Register</Nav.Link>
      </LinkContainer>
      </>
      : <>
      <LinkContainer to={`/users/${user.username}`}>
        <Nav.Link>{user.username}</Nav.Link>
      </LinkContainer>
      <Nav.Link onClick={() => setUser("")}>Logout</Nav.Link>
      </>
}
    </Nav>
    </Container>
  </Navbar>
    )
}


