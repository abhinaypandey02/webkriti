import {Navbar, Nav, NavDropdown, Modal, Form, Button} from "react-bootstrap";
import { useState} from "react";
import {Link} from 'react-router-dom';
import AddUserForm from "./forms/add_user_form";
import LoginForm from "./forms/login_form";
import {useUser} from "../../contexts/user_context";
import {logOut, sendResetPasswordLink} from "../../utilities/firebase/auth";
import EditUserForm from "./forms/edit_user_form";
import {useSocieties} from "../../contexts/societies_context";
import {useTheme} from "../../contexts/theme_context";

export default function NavigationBar() {
    const [user]=useUser();
    const [theme,setTheme]=useTheme();
    const societies = useSocieties();
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showResetPasswordModal,setShowResetPasswordModal]=useState(false);
    const [email, setEmail] = useState("");

    function onAddUserSuccess(){
        setShowAddUserModal(false);
        setTimeout(()=>alert("User Added"),0)
    }
    function onEditUserSuccess(){
        setShowEditProfileModal(false);
        setTimeout(()=>alert("User Updated"),0)
    }
    function onLoginUserSuccess(){
        setShowLoginModal(false);
    }
    function loginToReset(){
        setShowLoginModal(false);
        setShowResetPasswordModal(true);
    }
    function onResetPassword(e:any){
        e.preventDefault();
        sendResetPasswordLink(email).then(()=>{
            setShowResetPasswordModal(false);
            setTimeout(()=>alert("Email Sent if account exists!"),0)
        })
    }
    return (
        <Navbar style={{backgroundColor:(theme==="dark"?"black":"#F8F9FA")}}  expand="lg">
            <Modal onHide={()=>setShowAddUserModal(false)} show={showAddUserModal} centered>
                <Modal.Header closeButton>Add User</Modal.Header>
                <Modal.Body>
                    <AddUserForm onAddUserSuccess={onAddUserSuccess}/>
                </Modal.Body>

            </Modal>
            <Modal onHide={()=>setShowEditProfileModal(false)} show={showEditProfileModal} centered={true}>
                <Modal.Header closeButton={true}>Add User</Modal.Header>
                <Modal.Body>
                    <EditUserForm onEditUserSuccess={onEditUserSuccess}/>
                </Modal.Body>

            </Modal>
            <Modal onHide={()=>setShowResetPasswordModal(false)} show={showResetPasswordModal} centered={true}>
                <Modal.Header closeButton={true}>Reset Password</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onResetPassword}>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </Form.Group>
                        <Button type={'submit'}>Send Reset Password Link</Button>
                    </Form>
                </Modal.Body>

            </Modal>
            <Modal onHide={()=>setShowLoginModal(false)} show={showLoginModal} centered={true}>
                <Modal.Header closeButton={true}>Login</Modal.Header>
                <Modal.Body>
                    <LoginForm loginToReset={loginToReset} onLoginUserSuccess={onLoginUserSuccess}/>
                </Modal.Body>

            </Modal>
            <Navbar.Brand className={(theme==="dark"?"text-white":"text-dark")} as={Link} to='/'>Web-Kriti</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className={(theme==="dark"?"text-white":"text-dark")} as={Link} to="/">Home</Nav.Link>
                    <NavDropdown className={(theme==="dark"?"text-white":"text-dark")} title={<span className={'align-items-center '+(theme==="dark"?"text-white":"text-dark")}>Societies</span>} id="basic-nav-dropdown">
                        {societies.map((society) => <NavDropdown.Item key={society.name} as={Link}
                                                                      to={'/'+society.slug}>{society.name}</NavDropdown.Item>)}
                    </NavDropdown>
                </Nav>
                <Nav className={'align-items-center '+(theme==="dark"?"text-white":"text-dark")}>
                    <div className={'d-flex'}>Dark Mode <Form.Switch className={'ml-2'} id={'theme'} checked={theme==="dark"} onChange={(e)=>setTheme(e.target.checked?"dark":"light")}/></div>


                    {user&&user.role!=="member"&&<Nav.Link className={'align-items-center '+(theme==="dark"?"text-white":"text-dark")} onClick={()=>setShowAddUserModal(true)}>Add User</Nav.Link>}
                    {user?<NavDropdown alignRight title={<span className={'align-items-center '+(theme==="dark"?"text-white":"text-dark")}>{user.username}</span>} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={()=>setShowEditProfileModal(true)}>Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>logOut()}>Log out</NavDropdown.Item>
                    </NavDropdown>:<Nav.Link className={'align-items-center '+(theme==="dark"?"text-white":"text-dark")} onClick={()=>setShowLoginModal(true)}>Login</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}