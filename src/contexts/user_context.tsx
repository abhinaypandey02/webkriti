import {createContext, useEffect, useState} from "react";
import User from "../interfaces/user";
import fire from "../utilities/firebase/main";

const user_context=createContext<User|null|undefined>(undefined);
export default function UserContext({children}:{children:any}) {
    const [user, setUser] = useState<User|null|undefined>(undefined);
    useEffect(() => {
        // fire.auth().onAuthStateChanged()
    }, []);

    return (
        <user_context.Provider value={user}>
            {children}
        </user_context.Provider>
    );
}