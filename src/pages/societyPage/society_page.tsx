import Society from "../../interfaces/society";
import {Jumbotron} from "react-bootstrap";

export default function SocietyPage({society}:{society:Society}) {
    return (
        <div>
            <Jumbotron>
                <div className={'display-2'}>{society.name}</div>
                <div>{society.bio}</div>
            </Jumbotron>

        </div>
    );
}