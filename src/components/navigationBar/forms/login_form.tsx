import {FormEvent, useState} from "react";
import { loginUser} from "../../../utilities/firebase/auth";
import { getUserDocument} from "../../../utilities/firebase/firestore";
import {Button, Form} from "react-bootstrap";
import {useUser} from "../../../contexts/user_context";

export default function LoginForm({loginToReset,onLoginUserSuccess}:{loginToReset:any,onLoginUserSuccess: ()=>void}) {
    const [,setUser]=useUser();
    const [error, setError] = useState("");
    const [password, setPassword] = useState<string>("");//password state
    const [email, setEmail] = useState<string>("");//email state
    function onSubmit(e:FormEvent<HTMLFormElement>) {
        setError('');
        e.preventDefault();//preventing default form behaviour
        loginUser(email,password).then(()=>{
            getUserDocument(email).then((doc)=>{
                setUser(doc.data())
                onLoginUserSuccess();
            })
        }).catch((e:any)=>{
            setError(e.message);
        })
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control required={true} type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control required={true} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <small className={'text-danger'}>{error}</small>
            </Form.Group>
            <div>
                <Button variant={'link'} onClick={loginToReset}>Forgot Password?</Button>
            </div>
            <Button type={'submit'}>Login</Button>
        </Form>
    );
}