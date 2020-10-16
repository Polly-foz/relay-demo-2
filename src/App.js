import React from 'react';
import './App.css';
import {renderRoutes} from "react-router-config";
import {QueryRenderer} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import RelayEnvironment from './RelayEnvironment';

const AppNameQuery = graphql`
    query AppIdQuery {
        viewer {
            id
        }
    }
`



function App(props) {
    const renderQuery = ({error, props: rQProps}) => {
        if (error) {
            return (
                <div className="App">
                    {error.message}
                </div>
            )
        } else if (rQProps) {
            return (
                <div className="App">
                    <h1>App</h1>
                    {renderRoutes(props.route.routes)}
                </div>
            )
        }
        return <div className="App">Loading</div>
    }
    return (
        <QueryRenderer
            environment={RelayEnvironment}
            query={AppNameQuery}
            render={renderQuery}
            route={props.route}
        />
    );
}


export default App;
