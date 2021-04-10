import Society from "../../interfaces/society";
import fire from "./main";
import User from "../../interfaces/user";

export async function getSocieties(){
    return fire.firestore().collection('societies').get()
}

export async function getUserDocument(email:string){
    return fire.firestore().collection('users').doc(email).get()
}
export async function getUserByUsername(username:string){
    return fire.firestore().collection('users').where('username','==',username).get()
}
export async function addUserDocument(user:User){
    return fire.firestore().collection('users').doc(user.email).set(user);
}
export async function updateUserDocument(user:User){
    return fire.firestore().collection('users').doc(user.email).update(user);
}
export async function addSociety(society:Society){
    return fire.firestore().collection('societies').doc(society.name).set(society);
}