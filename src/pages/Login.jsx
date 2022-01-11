import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from "react-router";

export const Login = () => {

    const [loginError, setLoginError] = useState(false);
    const [username, setUsername] = useState("grumpy19");

    const {user, setUser} = useContext(UserContext);

        const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        setUser({username});
        navigate(`/users/${username}`);
    }

    useEffect(() => {
        if (user.username) navigate(`/users/${username}`);
    }, [])



    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="input" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <Link to="/register">Don't have an account?</Link>
        </div>
    )
}
