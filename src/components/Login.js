import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./css/Login.css";
import Network from "../network";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        Network.post('/authenticate',{username,password})
            .then(data=>{
                if(data && data.token){
                    sessionStorage.setItem("user", JSON.stringify(data));
                    window.location.pathname = '/dashboard';
                }
            });
    }

    useEffect(() => {
        if(window.location.pathname==='/login' || window.location.pathname==='/')
            document.getElementById('nav_bar').style.display='none';
        else document.getElementById('nav_bar').style.display='block';
    }, []);

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}