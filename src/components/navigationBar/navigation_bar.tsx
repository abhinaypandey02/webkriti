import {Navbar, Nav, NavDropdown, Modal, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import Society from "../../interfaces/society";
import {getSocieties} from "../../utilities/firebase/firestore";
import {Link} from 'react-router-dom';
import AddUserForm from "./forms/add_user_form";

export default function NavigationBar() {
    const [societies, setSocieties] = useState<Society[]>([]);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    useEffect(() => {
        getSocieties().then(societiesData => setSocieties(societiesData));
    }, []);
    return (
        <Navbar bg="light" expand="lg">
            <Modal onHide={()=>setShowAddUserModal(false)} show={showAddUserModal} centered>
                <Modal.Header closeButton>Add User</Modal.Header>
                <Modal.Body>
                    <AddUserForm/>
                </Modal.Body>

            </Modal>
            <Navbar.Brand as={Link} to='/'>React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <NavDropdown title="Societies" id="basic-nav-dropdown">
                        {societies.map((society) => <NavDropdown.Item as={Link}
                                                                      to={society.route}>{society.name}</NavDropdown.Item>)}
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link onClick={()=>setShowAddUserModal(true)}>Add User</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}