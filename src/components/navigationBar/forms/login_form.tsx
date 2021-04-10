import {FormEvent, useState} from "react";
import { loginUser} from "../../../utilities/firebase/auth";
import { getUserDocument} from "../../../utilities/firebase/firestore";
import {Button, Form} from "react-bootstrap";
import {useUser} from "../../../contexts/user_context";

export default function LoginForm({onLoginUserSuccess}:{onLoginUserSuccess: ()=>void}) {
    const [,setUser]=useUser();
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    function onSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        loginUser(email,password).then(()=>{
            getUserDocument(email).then((doc)=>{
                setUser(doc.data())
                onLoginUserSuccess();
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