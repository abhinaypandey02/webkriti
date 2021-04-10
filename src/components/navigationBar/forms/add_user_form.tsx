import {Button, Form} from "react-bootstrap";
import {FormEvent, useState} from "react";
import {addUser} from "../../../utilities/firebase/auth";
import {addUserDocument} from "../../../utilities/firebase/firestore";
import User from "../../../interfaces/user";

export default function AddUserForm() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<any>("member");
    function onSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        addUser(email,password).then(()=>{
            const user:User={
                name:username,
                username,
                email,
                bio:"",
                role
            }
            addUserDocument(user).then(()=>{
                alert("User Added");
            })
        })
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Role</Form.Label>

                <Form.Control as={'select'} value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="coordinator">Coordinator</option>
                    <option value="member">Member</option>
                </Form.Control>

            </Form.Group>
            <Button type={'submit'}>Add User</Button>
        </Form>
    );
}