import Society from "../../interfaces/society";
import fire from "./main";
import User from "../../interfaces/user";
import EventInterface from "../../interfaces/event";

export async function getSocieties(){
    return await fire.firestore().collection('societies').get()
}

export async function getUserDocument(email:string){
    return await fire.firestore().collection('users').doc(email).get()
}
export async function getUserByUsername(username:string){
    return await fire.firestore().collection('users').where('username','==',username).get()
}
export async function addUserDocument(user:User){
    return await fire.firestore().collection('users').doc(user.email).set(user);
}
export async function updateUserDocument(user:User){
    return await fire.firestore().collection('users').doc(user.email).update(user);
}
export async function addSociety(society:Society){
    return await fire.firestore().collection('societies').doc(society.name).set(society);
}
export async function addEvent(events:EventInterface[],society:Society){
    return await fire.firestore().collection('societies').doc(society.name).update({events});
}
export async function addGalleryImage(url:string,society:Society){
    return await fire.firestore().collection('societies').doc(society.name).update({gallery:[...society.gallery,url]});
}