import Society from "../../../interfaces/society";
import {Card} from "react-bootstrap";

export default function SocietyCard({society}:{society:Society}) {
    return (
        <Card className={'my-3 shadow-2'}>
            <Card.Body>
                <h1>{society.name}</h1>
                <small className={'text-muted'}>{society.description}</small>
            </Card.Body>
        </Card>
    );
}