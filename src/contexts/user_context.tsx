import {createContext, useContext, useEffect, useState} from "react";
import User from "../interfaces/user";
import fire from "../utilities/firebase/main";
import {getUserDocument} from "../utilities/firebase/firestore";


const user_context = createContext<[User | null | undefined, any]>([undefined, undefined]);

export function useUser() {
    return useContext(user_context);
}

export default function UserContext({children}: { children: any }) {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    useEffect(() => {
        fire.auth().onAuthStateChanged((user: any) => {
            if (user !== null) {
                getUserDocument(user.email).then((doc: any) => {
                    setUser(doc.data());
                })
            } else setUser(null);

        })
    }, []);

    return (
        <user_context.Provider value={[user, setUser]}>
            {children}
        </user_context.Provider>
    );
}