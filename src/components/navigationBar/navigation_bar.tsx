import {Navbar, Nav, NavDropdown, Modal, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import Society from "../../interfaces/society";
import {getSocieties} from "../../utilities/firebase/firestore";
import {Link} from 'react-router-dom';
import AddUserForm from "./forms/add_user_form";
import LoginForm from "./forms/login_form";
import {useUser} from "../../contexts/user_context";
import {logOut} from "../../utilities/firebase/auth";
import EditUserForm from "./forms/edit_user_form";

export default function NavigationBar() {
    const [user,setUser]=useUser();
    const [societies, setSocieties] = useState<Society[]>([]);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    useEffect(() => {
        getSocieties().then(societiesData => {
            let societiesArray:Society[]=[];
            societiesData.docs.forEach((doc:any)=>societiesArray.push(doc.data()))
            setSocieties(societiesArray)
        });
    }, []);
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
    return (
        <Navbar bg="light" expand="lg">
            <Modal onHide={()=>setShowAddUserModal(false)} show={showAddUserModal} centered>
                <Modal.Header closeButton>Add User</Modal.Header>
                <Modal.Body>
                    <AddUserForm onAddUserSuccess={onAddUserSuccess}/>
                </Modal.Body>

            </Modal>
            <Modal onHide={()=>setShowEditProfileModal(false)} show={showEditProfileModal} centered>
                <Modal.Header closeButton>Add User</Modal.Header>
                <Modal.Body>
                    <EditUserForm onEditUserSuccess={onEditUserSuccess}/>
                </Modal.Body>

            </Modal>
            <Modal onHide={()=>setShowLoginModal(false)} show={showLoginModal} centered>
                <Modal.Header closeButton>Login</Modal.Header>
                <Modal.Body>
                    <LoginForm onLoginUserSuccess={onLoginUserSuccess}/>
                </Modal.Body>

            </Modal>
            <Navbar.Brand as={Link} to='/'>Web-Kriti</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <NavDropdown title="Societies" id="basic-nav-dropdown">
                        {societies.map((society) => <NavDropdown.Item as={Link}
                                                                      to={'/'+society.slug}>{society.name}</NavDropdown.Item>)}
                    </NavDropdown>
                </Nav>
                <Nav>
                    {user&&user.role!=="member"&&<Nav.Link onClick={()=>setShowAddUserModal(true)}>Add User</Nav.Link>}
                    {user?<NavDropdown alignRight title={user.username} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={()=>setShowEditProfileModal(true)}>Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>logOut()}>Log out</NavDropdown.Item>
                    </NavDropdown>:<Nav.Link onClick={()=>setShowLoginModal(true)}>Login</Nav.Link>}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}