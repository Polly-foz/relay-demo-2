import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {renderRoutes} from "react-router-config";
import Issues from "./components/issues/Issues";
import Repositories from "./components/repositories/Repositories";
import Repository from "./components/repository/Repository";
import RepositoryIssues from "./components/repository/RepositoryIssues";
import {BrowserRouter} from "react-router-dom";

const routes = [
    {
        component: App,
        routes:[
            {
                path: "/",
                exact: true,
                component: Issues
            },
            {
                path: "/issues",
                component: Issues
            },
            {
                path: "/repositories",
                component: Repositories,
            },
            {
                path: "/repository/:name",
                component: Repository,
                routes: [
                    {
                        path: "/repository/:name/issues",
                        component: RepositoryIssues
                    }
                ]
            }
        ]
    }
]
ReactDOM.render(
    <BrowserRouter>
        {renderRoutes(routes)}
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
