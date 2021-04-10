import Society from "../../interfaces/society";
import {Button, Container, Form, Jumbotron, Modal} from "react-bootstrap";
import User from "../../interfaces/user";
import {useEffect, useState} from "react";
import {getUserByUsername} from "../../utilities/firebase/firestore";
import UserCard from "./userCard/user_card";
import {useUser} from "../../contexts/user_context";
import EventForm from "./eventForm/event_form";
import EventCard from "./eventCard/event_card";
import {useRefreshSocieties} from "../../contexts/societies_context";

export default function SocietyPage({society}: { society: Society }) {
    const [coordinators, setCoordinators] = useState<User[]>([]);
    const [members, setMembers] = useState<User[]>([]);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [user]=useUser();
    const refreshSocieties=useRefreshSocieties();
    let upcomingEvents=society.events.filter(event=>new Date(event.time).getTime()>=new Date().getTime()).sort((a,b)=>{
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
    async function onUpdateEvent(){
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

    useEffect(() => {
        updateCoordinators();
        updateMembers()

    }, [society]);

    return (
        <div>
            <Modal centered show={showAddEventModal} onHide={()=>setShowAddEventModal(false)}>
                <Modal.Header closeButton>
                    Add Event
                </Modal.Header>
                <Modal.Body>
                    <EventForm onUpdateEvent={onUpdateEvent} society={society}/>
                </Modal.Body>
            </Modal>
            <Jumbotron>
                <div className={'display-2'}>{society.name}</div>
                <div>{society.bio}</div>
            </Jumbotron>
            <Container className={'d-flex flex-wrap '}>
                <div className={'flex-grow-1'}>
                    <div className={'text-left'}>
                        <div className={'h1 mb-3'}>About:</div>
                        <div className={'m-3'}>{society.description}</div>

                    </div>
                    {coordinators.length > 0 && <div className={'text-left'}>
                        <div className={'h1 mb-3'}>Coordinators:</div>
                        <div className={'d-flex flex-wrap m-3'}>{coordinators.map(coordinator => <UserCard
                            user={coordinator}/>)}</div>

                    </div>}
                    {members.length > 0 && <div className={'text-left'}>
                        <div className={'h1 mb-3'}>Members:</div>
                        <div className={'d-flex flex-wrap m-3'}>{members.map(member => <UserCard user={member}/>)}</div>

                    </div>}
                </div>
                <div className={'p-3 round-border'}>
                    <div className={'d-flex justify-content-between align-items-center'}>
                        <div className={'h4 m-0'}>Upcoming Events</div>
                        {user&&<Button onClick={()=>setShowAddEventModal(true)} className={'ml-2 rounded-circle'}>+</Button>}
                    </div>
                    <hr/>
                    {upcomingEvents.length>0?upcomingEvents.map((event)=>
                        <EventCard society={society} event={event} onUpdateEvent={onUpdateEvent}/>
                    ):"No Upcoming Events!"}

                </div>
            </Container>


        </div>
    );
}