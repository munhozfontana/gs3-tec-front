import React from "react";

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from "../pages/auth";
import CadastroUsuario from "../pages/cadastro-usuario";

export const Routing = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Auth} />
                <Route exact path="/cadastro-usuario" component={CadastroUsuario} />
            </Switch>
        </BrowserRouter>
    )
}