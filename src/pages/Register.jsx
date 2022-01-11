import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap'


export const Register = () => {

    const [resgisterError, setLoginError] = useState(false);

    
    const handleRegister = () => {
        console.log("register");
    }

    return (
        <div>
            <h1>Register</h1>
                        <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Avatar URL</Form.Label>
                    <Form.Control placeholder="Enter avatar URL" />
                </Form.Group>
                <Button variant="primary" onClick={handleRegister}>
                    Register
                </Button>
            </Form>
            <Link to="/login">Already have an account?</Link>
        </div>
    )
}
