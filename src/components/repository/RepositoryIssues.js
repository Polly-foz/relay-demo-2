import React from "react";
import graphql from 'babel-plugin-relay/macro';
import {createFragmentContainer} from "react-relay";

function RepositoryIssues({issues}) {
    if (issues) {
        return (
            <div>
                <h3>Repository Issues</h3>
                <ol>
                    {issues.edges.map(edge => {
                        const {url, bodyText} = edge.node
                        return (
                            <li>
                                <a href={url}>{bodyText}</a>
                            </li>
                        )
                    })}
                </ol>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }

}

export default createFragmentContainer(RepositoryIssues, {
    issues: graphql`
        fragment RepositoryIssues_issues on IssueConnection
        @argumentDefinitions(first:{type:"Int"}){
            edges{
                node{
                    url
                    bodyText
                }
            }
        }
    `
});