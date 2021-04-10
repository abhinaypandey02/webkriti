import EventInterface from "./event";

export default interface Society{
    name:string,
    bio:string,
    description:string,
    events:EventInterface[],
    slug:string,

    coordinators:string[],
    members:string[],
    gallery:string[]
}