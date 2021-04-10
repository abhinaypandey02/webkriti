import Society from "../../interfaces/society";
import {Container, Jumbotron} from "react-bootstrap";
import User from "../../interfaces/user";
import {useEffect, useState} from "react";
import {getUserByUsername} from "../../utilities/firebase/firestore";
import UserCard from "./userCard/user_card";

export default function SocietyPage({society}:{society:Society}) {
    const [coordinators, setCoordinators] = useState<User[]>([]);
    const [members, setMembers] = useState<User[]>([]);

    async function updateMembers(){
        let membersT:any=[];
        await Promise.all(society.members.map(async coordinator=>{
            const data=await getUserByUsername(coordinator);
            if(data.docs.length===1)membersT.push(data.docs[0].data());
        }))
        setMembers(membersT);
    }
    async function updateCoordinators(){
        let coordinatorsT:any=[];
        await Promise.all(society.coordinators.map(async coordinator=>{
            const data=await getUserByUsername(coordinator);
            if(data.docs.length===1)coordinatorsT.push(data.docs[0].data());
        }))
        setCoordinators(coordinatorsT);
    }
    useEffect(() => {
        updateCoordinators();
        updateMembers()

    }, [society]);

    return (
        <div>
            <Jumbotron>
                <div className={'display-2'}>{society.name}</div>
                <div>{society.bio}</div>
            </Jumbotron>
            {coordinators.length>0&&<Container className={'text-left'}>
                <div className={'h1 mb-3'}>Coordinators:</div>
                <div className={'d-flex flex-wrap m-3'}>{coordinators.map(coordinator=><UserCard user={coordinator}/>)}</div>

            </Container>}
            {members.length>0&&<Container className={'text-left'}>
                <div className={'h1 mb-3'}>Members:</div>
                <div className={'d-flex flex-wrap m-3'}>{members.map(member=><UserCard user={member}/>)}</div>

            </Container>}


        </div>
    );
}