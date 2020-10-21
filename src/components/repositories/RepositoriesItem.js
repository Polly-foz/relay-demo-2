import React from "react";
import graphql from 'babel-plugin-relay/macro';
import {createFragmentContainer} from "react-relay"
import {Link} from "react-router-dom"

function RepositoriesItem({repository}) {
    const {name,url,createdAt,id} = repository
    return (
        <tr>
            <td><a href={url}>{name}</a></td>
            <td>{createdAt}</td>
            <td><Link to={`/repository/${name}`}>go</Link></td>
        </tr>
    )
}

export default createFragmentContainer(RepositoriesItem, {
    repository: graphql`
        fragment RepositoriesItem_repository on Repository{
            name
            url
            createdAt
            id
        }
    `
});