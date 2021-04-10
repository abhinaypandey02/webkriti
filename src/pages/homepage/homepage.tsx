import {useSocieties} from "../../contexts/societies_context";
import SocietyCard from "./societyCard/society_card";
import {Container} from "react-bootstrap";
import {useTheme} from "../../contexts/theme_context";

export default function Homepage() {
    const [theme]=useTheme();//global theme
    const societies=useSocieties();//global societies
    return (
        <Container className={''+(theme==="dark"&&"bg-dark")}>
            <div className={'display-4 my-5 '+(theme==="dark"&&"text-white")}>Societies:</div>
            {societies.map((society,index)=><SocietyCard key={society.name} index={index} society={society}/>)}
        </Container>
    );
}