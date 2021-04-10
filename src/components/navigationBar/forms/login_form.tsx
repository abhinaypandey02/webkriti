import {FormEvent, useState} from "react";
import {addUser, loginUser} from "../../../utilities/firebase/auth";
import User from "../../../interfaces/user";
import {addUserDocument, getUserDocument} from "../../../utilities/firebase/firestore";
import {Button, Form} from "react-bootstrap";
import {useUser} from "../../../contexts/user_context";

export default function LoginForm() {
    const [,setUser]=useUser();
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    function onSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        loginUser(email,password).then(()=>{
            getUserDocument(email).then((doc)=>{
                setUser(doc.data())
            })
        })
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button type={'submit'}>Login</Button>
        </Form>
    );
}