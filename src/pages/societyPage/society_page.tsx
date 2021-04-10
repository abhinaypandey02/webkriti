import Society from "../../interfaces/society";
import {Button, Carousel, Container, Form, Jumbotron, Modal} from "react-bootstrap";
import User from "../../interfaces/user";
import {useEffect, useState} from "react";
import {addGalleryImage, getUserByUsername} from "../../utilities/firebase/firestore";
import UserCard from "./userCard/user_card";
import {useUser} from "../../contexts/user_context";
import EventForm from "./eventForm/event_form";
import EventCard from "./eventCard/event_card";
import {useRefreshSocieties} from "../../contexts/societies_context";
import {uploadGalleryImage} from "../../utilities/firebase/storage";
import {useTheme} from "../../contexts/theme_context";

export default function SocietyPage({society}: { society: Society }) {
    const [coordinators, setCoordinators] = useState<User[]>([]);
    const [members, setMembers] = useState<User[]>([]);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showAddImage, setShowAddImage] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [user] = useUser();
    const refreshSocieties = useRefreshSocieties();
    let upcomingEvents = society.events.filter(event => new Date(event.time).getTime() >= new Date().getTime()).sort((a, b) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
    })

    async function updateMembers() {
        let membersT: any = [];
        await Promise.all(society.members.map(async coordinator => {
            const data = await getUserByUsername(coordinator);
            if (data.docs.length === 1) membersT.push(data.docs[0].data());
        }))
        setMembers(membersT);
    }

    async function onUpdateEvent() {
        refreshSocieties();
        setShowAddEventModal(false);
    }

    async function updateCoordinators() {
        let coordinatorsT: any = [];
        await Promise.all(society.coordinators.map(async coordinator => {
            const data = await getUserByUsername(coordinator);
            if (data.docs.length === 1) coordinatorsT.push(data.docs[0].data());
        }))
        setCoordinators(coordinatorsT);
    }

    function onImageChange(e: any) {
        setUploading(true)
        uploadGalleryImage(society.name, e.target.files[0]).then((url) => {
            setImage(url);
            setUploading(false);
        }).catch(() => setUploading(false));
    }

    function onImageUpload(e: any) {
        e.preventDefault();

        if (image) addGalleryImage(image, society).then(() => {
            refreshSocieties()
            setShowAddImage(false)
        })
        else setShowAddImage(false)

    }

    useEffect(() => {
        updateCoordinators();
        updateMembers()
        // eslint-disable-next-line
    }, [society]);
    const [theme]=useTheme();
    return (
        <div className={theme==="dark"?"text-white":"text-dark"}>
            <Modal centered show={showAddEventModal} onHide={() => setShowAddEventModal(false)}>
                <Modal.Header closeButton>
                    Add Event
                </Modal.Header>
                <Modal.Body>
                    <EventForm onUpdateEvent={onUpdateEvent} society={society}/>
                </Modal.Body>
            </Modal>
            <Modal centered show={showAddImage} onHide={() => setShowAddImage(false)}>
                <Modal.Header closeButton>
                    Add Image to Gallery
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onImageUpload}>
                        <Form.Group>
                            <Form.Label>Select Image</Form.Label>
                            <Form.Control onChange={onImageChange} accept={'image/*'} type={'file'}/>
                        </Form.Group>
                        <Button disabled={uploading || image === null}
                                type={'submit'}>{uploading ? "Uploading" : "Add Image"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Jumbotron style={{backgroundColor:theme==="dark"?"black":"#F8F9FA"}}>
                <div className={'display-3 '+(theme==="dark"&&"text-white")}>{society.name}</div>
                <div className={''+(theme==="dark"&&"text-white")}>{society.bio}</div>
            </Jumbotron>
            <Container className={'d-flex flex-wrap'}>
                <div className={'col-12 col-md-9'}>
                    <div className={'text-left'}>
                        <div className={'h1 mb-3'}>About:</div>
                        <div className={'m-3'}>{society.description}</div>
                    </div>
                    <div className={'text-left'}>
                        <div className={'d-flex justify-content-between'}>
                            <div className={'h1 mb-3'}>Gallery:</div>
                            {user &&
                            <Button style={{width:40,height:40}} onClick={() => setShowAddImage(true)} className={'rounded-circle'}>+</Button>}
                        </div>

                        <div className={'m-3 '}>
                            <Carousel>
                                {society.gallery.map((url,index) => <Carousel.Item key={url+index}>
                                    <img  className={'d-block w-100'} src={url} alt={society.name}/>
                                </Carousel.Item>)}
                            </Carousel>
                        </div>
                    </div>
                    {coordinators.length > 0 && <div className={'text-left mt-3'}>
                        <div className={'h1 mb-3'}>Coordinators:</div>
                        <div className={'d-flex flex-wrap m-3'}>{coordinators.map((coordinator,index) => <UserCard
                            user={coordinator} key={coordinator.username+index} />)}</div>

                    </div>}
                    {members.length > 0 && <div className={'text-left'}>
                        <div className={'h1 mb-3'}>Members:</div>
                        <div className={'d-flex flex-wrap m-3'}>{members.map((member,index) => <UserCard key={member.username+index} user={member}/>)}</div>

                    </div>}
                </div>
                <div className={'p-3 round-border col-12 col-md-3'}>
                    <div className={'d-flex justify-content-between align-items-center'}>
                        <div className={'h4 m-0'}>Upcoming Events</div>
                        {user &&
                        <Button style={{width:40,height:40}} onClick={() => setShowAddEventModal(true)} className={'ml-2 rounded-circle'}>+</Button>}
                    </div>
                    <hr/>
                    {upcomingEvents.length > 0 ? upcomingEvents.map((event) =>
                        <EventCard key={event.time} society={society} event={event} onUpdateEvent={onUpdateEvent}/>
                    ) : "No Upcoming Events!"}

                </div>
            </Container>


        </div>
    );
}