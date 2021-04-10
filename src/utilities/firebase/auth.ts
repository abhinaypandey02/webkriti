import fire from "./main";

export async function addUser(username:string,password:string) {
    return await fire.auth().createUserWithEmailAndPassword(username,password);
}