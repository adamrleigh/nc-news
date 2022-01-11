import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const Login = () => {

    const [loginError, setLoginError] = useState(false);
    const [username, setUsername] = useState("grumpy19");

    const {user, setUser} = useContext(UserContext);

    const handleChange = (event) => {
        setUsername(event.target.value);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        setUser({username});
        setUsername("");
    }


    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="input" placeholder="Enter username" value={username} onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <Link to="/register">Don't have an account?</Link>
        </div>
    )
}
