import {createContext, useContext, useState} from "react";


const theme_context = createContext<["dark"|"light", any]>(["light", undefined]);

export function useTheme() {
    return useContext(theme_context);
}

export default function ThemeContext({children}: { children: any }) {
    //global state for themes
    const [theme,setTheme] = useState<"dark"|"light">("light");
    return (
        <theme_context.Provider value={[theme, setTheme]}>
    {children}
    </theme_context.Provider>
);
}