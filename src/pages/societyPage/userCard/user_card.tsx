import User from "../../../interfaces/user";
import {Card} from "react-bootstrap";
import {useTheme} from "../../../contexts/theme_context";
const DEFAULT_PP="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
export default function UserCard({user}:{user:User}) {
    const [theme]=useTheme();//global themes
    return (
        <Card className={'m-3   '+(theme==="dark"?"bg-dark text-white border-light":"shadow-2")} style={{ width: '18rem' }}>
            <Card.Body className={'d-flex flex-column'}>
                <img alt={'profile'} className={'align-self-center'} src={user.profilePicture?user.profilePicture:DEFAULT_PP} style={{maxHeight:200}}/>
                <h3 className={'m-0 mt-2'}>{user.name}</h3>
                <small className={(theme==="dark"?'text-white':"text-muted")}>{user.bio}</small>
            </Card.Body>
        </Card>
    );
}