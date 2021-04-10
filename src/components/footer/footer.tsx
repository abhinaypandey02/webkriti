import {Container, Col} from "react-bootstrap";
import {useSocieties} from "../../contexts/societies_context";
import {Link} from 'react-router-dom';
import {useTheme} from "../../contexts/theme_context";
export default function Footer() {
    const societies=useSocieties();
    const [theme]=useTheme();
    return (
        <Container className={'mt-5 '+(theme==="dark"?"text-white ":"text-dark")} style={{backgroundColor:(theme==="dark"?"black":"#F8F9FA")}} fluid={true}>
            <Container className={'d-flex p-3 align-items-center justify-content-around'}>
                    <Col>
                        <h2>WebKriti</h2>

                    </Col>
                    <Col>
                        <div>Societies</div>
                        {societies.map((society)=><div key={society.name}><Link to={'/'+society.slug}>{society.name}</Link></div>)}
                    </Col>

            </Container>
        </Container>
    );
}