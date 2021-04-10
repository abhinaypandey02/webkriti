import {useSocieties} from "../../contexts/societies_context";
import SocietyCard from "./societyCard/society_card";
import {Container} from "react-bootstrap";

export default function Homepage() {
    const societies=useSocieties();
    return (
        <Container>
            {societies.map(society=><SocietyCard society={society}/>)}
        </Container>
    );
}