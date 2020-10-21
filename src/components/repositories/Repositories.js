import React from "react";
import graphql from 'babel-plugin-relay/macro';
import {createRefetchContainer} from "react-relay";
import RepositoriesItem from "./RepositoriesItem";

function Repositories({relay, viewer}) {
    const _nextPage = () => {

        const newVars = {
            first: 3,
            after: viewer.repositories.pageInfo.endCursor,
            last: null,
            before: null,
        }
        relay.refetch(
            newVars,
            null,
            () => {
                // console.log('Refetch done - next page')
            },
            {force: true}
        )
    }

    const _previousPage = ()=>{
        relay.refetch(
            {
                first: null,
                after: null,
                last: 3,
                before: viewer.repositories.pageInfo.startCursor,
            },
            null,
            () => {
                // console.log('Refetch done - prev page')
            },
            {force: true}
        )
    }


    return (
        <div>
            <h1>Repositories</h1>
            <table>
                <thead>
                <tr>
                    <td>name</td>
                    <td>createdAt</td>
                    <td>issues</td>
                </tr>
                </thead>
                <tbody>
                {viewer.repositories.edges.map(edge => {
                    return (
                        <RepositoriesItem key={edge.node.id} repository={edge.node}/>
                    )
                })}
                </tbody>
            </table>
            <button onClick={() => _previousPage()} disabled={!viewer?.repositories?.pageInfo?.hasPreviousPage}>previous page</button>
            <button onClick={() => _nextPage()} disabled={!viewer?.repositories?.pageInfo?.hasNextPage}>next page</button>
        </div>
    )
}

export default createRefetchContainer(Repositories,
    {
        viewer: graphql`
            fragment Repositories_viewer on User
            @argumentDefinitions (
                first: { type: "Int" }
                after: { type: "String" }
                last:  { type: "Int" }
                before: { type: "String" }
            ){
                login
                repositories(
                    first: $first,
                    after: $after,
                    last: $last,
                    before: $before,
                    orderBy: {field: CREATED_AT, direction: DESC}
                ){
                    totalCount
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        cursor
                        node {
                            id
                            ...RepositoriesItem_repository
                        }
                    }
                }
            }
        `
    },
    graphql`
        query RepositoriesQuery(
            $first: Int,
            $last: Int,
            $after: String,
            $before: String
        ){
            viewer{
                ...Repositories_viewer @arguments(
                    first: $first,
                    last: $last,
                    after: $after,
                    before: $before
                )
            }
        }
    `
);