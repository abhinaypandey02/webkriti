import {createContext, useContext, useEffect, useState} from "react";
import {getSocieties} from "../utilities/firebase/firestore";
import Society from "../interfaces/society";


const societies_context = createContext<Society[]>([]);
const refresh_societies_context = createContext<any>([]);

export function useSocieties() {
    return useContext(societies_context);
}
export function useRefreshSocieties() {
    return useContext(refresh_societies_context);
}
export default function SocietiesContext({children}: { children: any }) {
    const [societies, setSocieties] = useState<Society[]>([]);

    function fetchData(){
        console.log(1)
        getSocieties().then(societiesData => {
            console.log(societiesData.docs[0].data())

            let societiesArray:Society[]=[];
            societiesData.docs.forEach((doc:any)=>societiesArray.push(doc.data()))
            setSocieties(societiesArray)
        });
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <societies_context.Provider value={societies}>
            <refresh_societies_context.Provider value={fetchData}>
            {children}
            </refresh_societies_context.Provider>
        </societies_context.Provider>
    );
}