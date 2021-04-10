import {createContext, useContext, useEffect, useState} from "react";
import User from "../interfaces/user";
import fire from "../utilities/firebase/main";
import {getUserDocument} from "../utilities/firebase/firestore";


const theme_context = createContext<["dark"|"light", any]>(["light", undefined]);

export function useTheme() {
    return useContext(theme_context);
}

export default function ThemeContext({children}: { children: any }) {
    const [theme,setTheme] = useState<"dark"|"light">("light");
    return (
        <theme_context.Provider value={[theme, setTheme]}>
    {children}
    </theme_context.Provider>
);
}