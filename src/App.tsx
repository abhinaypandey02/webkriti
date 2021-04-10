import React, {useEffect, useState} from 'react';
import './App.css';
import {HashRouter, Switch, Route} from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import NavigationBar from "./components/navigationBar/navigation_bar";
import Society from "./interfaces/society";
import {getSocieties} from "./utilities/firebase/firestore";
import SocietyPage from "./pages/societyPage/society_page";
import {useSocieties} from "./contexts/societies_context";
import Footer from "./components/footer/footer";

function App() {
    const societies = useSocieties();
    return (
        <div className="App min-vh-100 d-flex flex-column">
            <HashRouter>
                <NavigationBar/>
                <div className={'flex-grow-1'}>
                    <Switch>
                        <Route exact path={'/'} component={Homepage}/>
                        {societies.map((society)=>(
                            <Route path={'/'+society.slug}>
                                <SocietyPage society={society}/>
                            </Route>
                        ))}
                    </Switch>
                </div>

                <Footer/>
            </HashRouter>
        </div>
    );
}

export default App;
