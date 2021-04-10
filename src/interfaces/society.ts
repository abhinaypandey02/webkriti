import User from "./user";

export default interface Society{
    name:string,
    bio:string,
    route:string,
    coordinators:User[],
    members:User[],
    gallery:string[]
}