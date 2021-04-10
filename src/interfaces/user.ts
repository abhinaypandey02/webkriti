export default interface User{
    name:string,
    bio:string,
    username:string,
    email:string
    role:"admin"|"coordinator"|"member",
    profilePicture:string|null
}