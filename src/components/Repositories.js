import React from "react";
import graphql from 'babel-plugin-relay/macro';
import {createRefetchContainer} from "react-relay";
import Repository from "./Repository";


function Repositories({relay, viewer}) {
    const _refetch = () => {
        relay.refetch(
            {
                count: 2,
                cursor: viewer.repositories.pageInfo.endCursor,
            },
            {
                count: 2,
                cursor: viewer.repositories.pageInfo.endCursor,
            },
            () => {
                console.log('Refetch done')
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
                        <Repository key={edge.node.id} repository={edge.node}/>
                    )
                })}
                </tbody>
            </table>
            <button onClick={() => _refetch()}>load more</button>
        </div>
    )
}

export default createRefetchContainer(Repositories,
    {
        viewer: graphql`
            fragment Repositories_viewer on User@argumentDefinitions(
                count: {type:"Int",defaultValue:5}
                cursor: {type:"String"}
            ){
                login
                repositories(
                    first: $count,
                    after: $cursor
                    orderBy: {field: CREATED_AT, direction: DESC}
                )@connection(
                    key: "Repositories_repositories"
                ){
                    totalCount
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                    }
                    edges {
                        cursor
                        node {
                            id
                            ...Repository_repository
                        }
                    }
                }
            }
        `
    },
    graphql`
        query RepositoriesQuery(
            $count: Int!
            $cursor: String
        ){
            viewer{
                ...Repositories_viewer @arguments(
                    count: $count
                    cursor: $cursor
                )
            }
        }
    `
);