import React, {createContext, useState} from "react";
import {Switch, Route} from "react-router-dom";
import { PrivateRoute } from "./api/PrivateRoute";
import { AppContext } from "./AppContext";
import { Dashbord } from "./components/dashbord";
import { Homepage } from "./components/homepage";
import { Menu } from "./components/menu";

export const LoggerContext = React.createContext(null)
const AppRouter = () => {
const [hasLogger, setLogger] = useState(false)
const [LoginLogger, setLoginLogger] = useState(false)
return (
    <Switch>
        <AppContext.Provider value={{hasLogger, setLogger}} >
        <LoggerContext.Provider value={{LoginLogger, setLoginLogger}}>
        <Menu/>
        <Route exact path="/" component={Homepage}/>
        <PrivateRoute path='/dashbord/' component={Dashbord}/>
        </LoggerContext.Provider>
        </AppContext.Provider>
    </Switch>
)
}
export default AppRouter;