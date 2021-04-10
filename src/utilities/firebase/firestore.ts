import Society from "../../interfaces/society";
import fire from "./main";
import User from "../../interfaces/user";

export async function getSocieties(){
    const societies:Society[]=[
        {name:"XXX",bio:"XYZ",route:"/xxx",members:[],coordinators:[],gallery:[]}
    ]
    return societies;
}

export async function getUserDocument(username:string){
    return fire.firestore().collection('users').doc(username).get()
}
export async function addUserDocument(user:User){
    return fire.firestore().collection('users').doc(user.email).set(user);
}