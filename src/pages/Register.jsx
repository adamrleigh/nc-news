import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, NavItem } from 'react-bootstrap'
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";

export const Register = () => {

    const [resgisterError, setLoginError] = useState(false);
    const [userInput, setUserInput] = useState({});

    const navigate = useNavigate();

    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        if (user.username) navigate(`/users/${user.username}`);
    }, [])

    const handleChange = (event, field) => setUserInput({...userInput, [field]: event.target.value});
    
    const handleRegister = (event) => {
        event.preventDefault();
        setUser(userInput);
        navigate(`/users/${userInput.username}`);
    }
    

    return (
        <div>
            <h1>Register</h1>
                <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="input" placeholder="Enter your username" value={userInput.username} onChange={(e)=>handleChange(e, "username")}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control placeholder="Enter your name" value={userInput.name} onChange={(e)=>handleChange(e, "name")}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAvatarUrl">
                    <Form.Label>Avatar URL</Form.Label>
                    <Form.Control placeholder="Enter avatar URL" value={userInput.avatar_url} onChange={(e)=>handleChange(e, "avatar_url")}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <Link to="/login">Already have an account?</Link>
        </div>
    )
}
