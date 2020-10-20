import React from "react";
import {renderRoutes} from "react-router-config";
import graphql from 'babel-plugin-relay/macro';
import {createFragmentContainer} from "react-relay"

function Repository({repository}) {
    return (
        <tr>
            <td><a href={repository.url}>{repository.name}</a></td>
            <td>{repository.createdAt}</td>
            <td><a href="">go</a></td>
        </tr>
    )
}

export default createFragmentContainer(Repository, {
    repository: graphql`
        fragment Repository_repository on Repository{
            name
            url
            createdAt
            id
        }
    `
});