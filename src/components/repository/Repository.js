import React,{useEffect} from "react";
import {useParams, Link} from "react-router-dom"
import graphql from 'babel-plugin-relay/macro';
import {createFragmentContainer} from "react-relay";
import {renderRoutes} from "react-router-config";


function Repository({route,viewer,setRepositoryName}) {
    const name = useParams().name
    //TODO 怎么避免2次graphql请求
    useEffect(()=>{
        setRepositoryName(name)
    },[name])
    if(viewer && viewer.repository){
        const {url,receivedName} = viewer.repository
        return (
            <div>
                <h2>Repository</h2>
                <div><a href={url}>{receivedName}</a></div>
                <Link to={`/repository/${name}`}>home</Link>
                <span> | </span>
                <Link to={`/repository/${name}/issues`}>issues</Link>
                {renderRoutes(route.routes, {name: name,issues:viewer.repository.issues})}
            </div>
        )
    }else{
        return (
            <div>Loading...</div>
        )
    }

}

export default createFragmentContainer(Repository,{
    viewer: graphql`
        fragment Repository_viewer on User@argumentDefinitions(name:{type:"String!"}){
            repository(name: $name){
                url
                receivedName:name
                issues{
                    ...RepositoryIssues_issues@arguments(first:3)
                }
            }
        }
    `
})

