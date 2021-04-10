import fire, {extra} from "./main";

export async function addUser(username:string,password:string) {
    return await extra.auth().createUserWithEmailAndPassword(username,password);
}
export async function loginUser(username:string,password:string) {
    return await fire.auth().signInWithEmailAndPassword(username,password);
}
export async function logOut(){
    return await fire.auth().signOut();
}
export async function sendResetPasswordLink(email:string){
    return await fire.auth().sendPasswordResetEmail(email);
}