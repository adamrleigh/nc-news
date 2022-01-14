import { Offcanvas, ListGroup, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { fetchUser } from "../Utils/api";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaQuestion, FaQuestionCircle } from "react-icons/fa";

export const UserList = ({ showOffCanvas, setShowOffCanvas }) => {
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState("grumpy19");

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const { user: userProfile } = await fetchUser(username);
      setLoginError(false);
      setUser(userProfile);
      setShowOffCanvas(false);
      navigate(`/users/${username}`);
    } catch (err) {
      setLoginError(true);
    }
  };

  const handleChange = (e) => {
    setLoginError(false);
    setUsername(e.target.value);
  };

  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={() => setShowOffCanvas(false)}
      placement="end"
    >
      <Offcanvas.Header
        closeButton
        className="align-self-start"
      ></Offcanvas.Header>
      <Offcanvas.Title className="align-self-center">Login</Offcanvas.Title>
      <Offcanvas.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="username">
            <FloatingLabel controlId="floatingUsername" label="Username">
              <Form.Control
                type="input"
                placeholder="Enter username"
                value={username}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="lg">
              Login
            </Button>
          </div>
        </Form>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            onClick={() => {
              navigate("/register");
              setShowOffCanvas(false);
            }}
          >
            <strong style={{ textDecoration: "underline" }}>
              Don't have an account? Register here
            </strong>
          </span>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
