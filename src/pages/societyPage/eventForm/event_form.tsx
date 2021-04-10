import {Button, Form} from "react-bootstrap";
import {FormEvent, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Society from "../../../interfaces/society";
import EventInterface from "../../../interfaces/event";
import {addEvent} from "../../../utilities/firebase/firestore";
export default function EventForm({society,onUpdateEvent}:{society:Society,onUpdateEvent:()=>void}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState<any>(new Date());
    function onSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        const event:EventInterface={
            title,description,time:startDate.toISOString()
        }
        addEvent([...society.events,event],society).then(onUpdateEvent);
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Time</Form.Label>
                <DatePicker className={'ml-2'} showTimeSelect selected={startDate} onChange={date => setStartDate(date)} />
            </Form.Group>
            <Button type={'submit'}>Add Event</Button>

        </Form>
    );
}