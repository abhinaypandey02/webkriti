import {Button, Card} from "react-bootstrap";
import EventInterface from "../../../interfaces/event";
import {addEvent} from "../../../utilities/firebase/firestore";
import Society from "../../../interfaces/society";
import {useTheme} from "../../../contexts/theme_context";

export default function EventCard({society,event,onUpdateEvent}:{society:Society,event:EventInterface,onUpdateEvent:()=>void}) {
    const date=new Date(event.time);//js date of the ISO String
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    const timeString=`${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    function onDelete(){
        addEvent(society.events.filter(e=>new Date(e.time).getTime()!==new Date(event.time).getTime()),society).then(onUpdateEvent)
    }
    const [theme]=useTheme();
    return (
        <Card className={'mb-3 '+(theme==="dark"&&"bg-dark border-light")}>
            <Card.Body className={'text-left'}>
                <div className={'h3 d-flex justify-content-between'}>
                    {event.title}
                    <Button style={{width:40,height:40}} variant={'danger'} className={'rounded-circle'} onClick={onDelete}>x</Button>
                </div>
                <small>{timeString}</small>

                <div className={'small text-muted'}>{event.description}</div>
            </Card.Body>
        </Card>
    );
}