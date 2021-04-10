import {Button, Card} from "react-bootstrap";
import EventInterface from "../../../interfaces/event";
import {addEvent} from "../../../utilities/firebase/firestore";
import Society from "../../../interfaces/society";

export default function EventCard({society,event,onUpdateEvent}:{society:Society,event:EventInterface,onUpdateEvent:()=>void}) {
    const date=new Date(event.time);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    const timeString=`${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    function onDelete(){
        addEvent(society.events.filter(e=>new Date(e.time).getTime()!==new Date(event.time).getTime()),society).then(onUpdateEvent)
    }
    return (
        <Card className={'mb-3'}>
            <Card.Body className={'text-left'}>
                <div className={'h3 d-flex justify-content-between'}>
                    {event.title}
                    <Button variant={'danger'} className={'rounded-circle'} onClick={onDelete}>x</Button>
                </div>
                <small>{timeString}</small>

                <div className={'small text-muted'}>{event.description}</div>
            </Card.Body>
        </Card>
    );
}