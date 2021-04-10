import User from "./user";

export default interface Society{
    name:string,
    bio:string,
    slug:string,

    coordinators:string[],
    members:string[],
    gallery:string[]
}