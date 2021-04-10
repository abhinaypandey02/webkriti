import React, {useEffect, useState} from 'react';
import './App.css';
import {HashRouter, Switch, Route} from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import NavigationBar from "./components/navigationBar/navigation_bar";
import Society from "./interfaces/society";
import {getSocieties} from "./utilities/firebase/firestore";
import SocietyPage from "./pages/societyPage/society_page";

function App() {
    const [societies, setSocieties] = useState<Society[]>([]);
    useEffect(() => {
        getSocieties().then(societiesData=> {
            let societiesArray:Society[]=[];
            societiesData.docs.forEach((doc:any)=>societiesArray.push(doc.data()))
            setSocieties(societiesArray)
        });
    }, []);

    return (
        <div className="App">
            <HashRouter>
                <NavigationBar/>
                <Switch>
                    <Route exact path={'/'} component={Homepage}/>
                    {societies.map((society)=>(
                        <Route path={'/'+society.slug}>
                            <SocietyPage society={society}/>
                        </Route>
                    ))}
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
