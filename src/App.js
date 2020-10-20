import React from 'react';
import './App.css';
import {renderRoutes} from "react-router-config";
import {QueryRenderer} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import RelayEnvironment from './RelayEnvironment';
import Profile from "./components/Profile";

const AppNameQuery = graphql`
    query AppIdQuery($first: Int, $after: String, $before: String, $last: Int) {
        viewer {
            id
            ...Profile_viewer
            ...Issues_viewer
            ...Repositories_viewer @arguments(
                first: $first,
                last: $last,
                after: $after,
                before: $before
            )
        }
    }
`

function App(props) {
    const renderQuery = ({error, props: rQProps}) => {
        console.log('TEST');
        if (error) {
            return (
                <div className="App">
                    {error.message}
                </div>
            )
        } else if (rQProps) {
            return (
                <div className="App">
                    <Profile viewer={rQProps.viewer}/>
                    {renderRoutes(props.route.routes, {viewer: rQProps.viewer})}
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
            variables={{
                first: 1,
                after: null
            }}
        />
    );
}

export default App;
