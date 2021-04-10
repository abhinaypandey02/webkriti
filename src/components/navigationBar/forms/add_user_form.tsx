import {Button, Form} from "react-bootstrap";
import {FormEvent, useState} from "react";
import {addUser} from "../../../utilities/firebase/auth";
import {addSociety, addUserDocument} from "../../../utilities/firebase/firestore";
import User from "../../../interfaces/user";
import {useUser} from "../../../contexts/user_context";
import Society from "../../../interfaces/society";

export default function AddUserForm({onAddUserSuccess}:{onAddUserSuccess:()=>void}) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<any>("member");
    const [user,setUser]=useUser();
    function onSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // addUser(email,password).then(()=>{
        //     const user:User={
        //         name:username,
        //         username,
        //         email,
        //         bio:"",
        //         role,
        //         profilePicture:null
        //     }
        //     addUserDocument(user).then(()=>{
        //         onAddUserSuccess();
        //     })
        // })
        const s:Society={
            name:username,
            bio:email,
            slug:password,
            coordinators:[],
            members:[],
            gallery:[],
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat lorem in felis iaculis hendrerit. Proin quis sagittis nulla. Nunc lacinia odio sed libero fringilla auctor. Pellentesque ut finibus urna. Proin egestas leo at lacus volutpat, quis bibendum felis commodo. Suspendisse molestie finibus arcu id condimentum. Nullam lobortis at magna sit amet tristique. Morbi tincidunt, arcu non scelerisque pharetra, erat augue aliquam felis, ut porta ipsum augue ac mi. Mauris a tortor sit amet sapien rutrum porta at ut arcu. Ut placerat scelerisque ipsum ut congue. Pellentesque ut arcu eget odio cursus efficitur.",
            events:[]
        }
        addSociety(s);
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
                    {user&&user.role==="admin"&&<option value="admin">Admin</option>}
                    <option value="coordinator">Coordinator</option>
                    <option value="member">Member</option>
                </Form.Control>

            </Form.Group>
            <Button type={'submit'}>Add User</Button>
        </Form>
    );
}