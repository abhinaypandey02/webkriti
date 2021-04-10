import {FormEvent, useState} from "react";
import {useUser} from "../../../contexts/user_context";
import User from "../../../interfaces/user";
import { updateUserDocument} from "../../../utilities/firebase/firestore";
import {Button, Form} from "react-bootstrap";
import {uploadImage} from "../../../utilities/firebase/storage";

export default function EditUserForm({onEditUserSuccess}:{onEditUserSuccess:()=>void}) {
    const [user]=useUser();
    const [name, setName] = useState<string>(user?user.name:"");//name state
    const [username, setUsername] = useState<string>(user?user.username:"");//username state
    const [bio, setBio] = useState<string>(user?user.bio:"");//bio state
    const [email, setEmail] = useState<string>(user?user.email:"");//email state
    const [role, setRole] = useState<any>(user?user.role:"member");//role state
    const [profilePicture, setProfilePicture] = useState<string|null>(user?user.profilePicture:null);//profilepicture state
    const [uploading, setUploading] = useState(false);//uploading state

    function onImageChange(e: any) {
        setUploading(true)
        //uploading image
        uploadImage(user, e.target.files[0]).then((url) => {
            setProfilePicture(url);
            setUploading(false);
        }).catch(()=>setUploading(false));
    }
    function onSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();//preventing default form behaviour
        const userT:User={
            name,
            username,
            email,
            bio,
            role,
            profilePicture
        }
        updateUserDocument(userT).then(()=>{
            onEditUserSuccess();
        })
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control required={true} value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control required={true} value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control required={true} value={bio} onChange={(e) => setBio(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control required={true} type="email" value={email} disabled={true} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Control disabled={true} as={'select'} value={role} onChange={(e) => setRole(e.target.value)}>
                    {user&&user.role==="admin"&&<option value="admin">Admin</option>}
                    <option value="coordinator">Coordinator</option>
                    <option value="member">Member</option>
                </Form.Control>

            </Form.Group>
            <Form.Group>
                <Form.Label>Profile Picture</Form.Label>
                <div className='my-2'>{profilePicture&&<img alt="profile" src={profilePicture} style={{maxHeight:100}}/>}</div>

                <Form.Control type={'file'} accept="image/*" onChange={onImageChange}/>
            </Form.Group>
            <Button type={'submit'} disabled={uploading}>{uploading?"Uplaoding Image":"Update User"}</Button>
        </Form>
    );
}