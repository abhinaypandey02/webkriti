import Society from "../../../interfaces/society";
import {Card} from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import {useTheme} from "../../../contexts/theme_context";
export default function SocietyCard({society,index}:{society:Society,index:number}) {
    const history=useHistory();
    const [theme]=useTheme();
    return (
        <Card onClick={()=>history.push('/'+society.slug)} className={'my-3 pointer-on-hover '+(index%2===0?"text-left ":"text-right ")+(theme==="dark"?"bg-dark border-light":"shadow-2")}>
            <Card.Body className={'d-flex '+(index%2===0?"justify-content-start":"justify-content-end")}>
                {index%2===0&&society.gallery.length>0&&<img height={150} src={society.gallery[0]} alt={society.name}/>}
                <div className={'mx-4 '+(theme==="dark"&&"text-white")}>
                    <h1>{society.name}</h1>
                    <h4>{society.bio}</h4>
                    <small className={(theme==="dark"?"text-white":"text-muted")}>{society.description}</small>
                </div>
                {index%2!==0&&society.gallery.length>0&&<img height={150} src={society.gallery[0]} alt={society.name}/>}


            </Card.Body>
        </Card>
    );
}