import fire from "./main";

export const uploadImage=async (user:any,file:any)=>{
    const ref=fire.storage().ref(`${user.email}/profilePicture/${file.name}`);
    await ref.put(file);
    return await ref.getDownloadURL();
}
export const uploadGalleryImage=async (societyName:string,file:any)=>{
    const ref=fire.storage().ref(`${societyName}/gallery/${file.name}`);
    await ref.put(file);
    return await ref.getDownloadURL();
}