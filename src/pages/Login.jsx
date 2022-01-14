import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert, FloatingLabel } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import { fetchUser } from "../Utils/api";

export const Login = () => {
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
      navigate(`/users/${username}`);
    } catch (err) {
      setLoginError(true);
    }
  };

  const handleChange = (e) => {
    setLoginError(false);
    setUsername(e.target.value);
  };

  useEffect(() => {
    if (user.username) navigate(`/users/${username}`);
  }, []);

  return (
    <div>
      <h1>Login</h1>
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Link to="/register">Don't have an account?</Link>
      {loginError ? (
        <Alert variant="danger" color="black">
          User <strong>{username}</strong> not found
        </Alert>
      ) : null}
    </div>
  );
};
