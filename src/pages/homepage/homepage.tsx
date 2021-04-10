import {useSocieties} from "../../contexts/societies_context";
import SocietyCard from "./societyCard/society_card";
import {Container} from "react-bootstrap";
import {useTheme} from "../../contexts/theme_context";

export default function Homepage() {
    const [theme]=useTheme();
    const societies=useSocieties();
    return (
        <Container className={''+(theme==="dark"&&"bg-dark")}>
            <div className={'display-4 my-5 '+(theme==="dark"&&"text-white")}>Societies:</div>
            {societies.map((society,index)=><SocietyCard index={index} society={society}/>)}
        </Container>
    );
}