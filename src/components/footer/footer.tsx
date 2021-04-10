import {Container} from "react-bootstrap";
import {useSocieties} from "../../contexts/societies_context";
import {Link} from 'react-router-dom';
export default function Footer() {
    const societies=useSocieties();
    return (
        <Container style={{backgroundColor:"#F8F9FA"}} fluid={true}>
            <Container className={'d-flex p-3 align-items-center justify-content-around'}>
                <h2>WebKriti</h2>
                <ul>
                    {societies.map((society)=><li><Link to={'/'+society.slug}>{society.name}</Link></li>)}
                </ul>
            </Container>
        </Container>
    );
}