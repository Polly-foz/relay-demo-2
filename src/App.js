import React,{useState} from 'react';
import './App.css';
import {renderRoutes} from "react-router-config";
import {QueryRenderer} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import RelayEnvironment from './RelayEnvironment';
import Profile from "./components/Profile";
import AppNav from "./components/AppNav";

const AppNameQuery = graphql`
    query AppIdQuery($first: Int, $after: String, $before: String, $last: Int, $name: String!) {
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
            ...Repository_viewer@arguments(name: $name)
        }
    }
`

function App(props) {

    const [repositoryName,setRepositoryName] = useState('')

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
                    <Profile viewer={rQProps.viewer}/>
                    <AppNav/>
                    {renderRoutes(props.route.routes, {viewer: rQProps.viewer, setRepositoryName:(name)=>{setRepositoryName(name)}})}
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
                first: 3,
                after: null,
                name: repositoryName
            }}
        />
    );
}

export default App;
