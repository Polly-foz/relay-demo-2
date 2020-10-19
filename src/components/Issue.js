import React from "react";
import graphql from 'babel-plugin-relay/macro';
import {createFragmentContainer} from "react-relay"
// const fragment = {
//     issue:graphql`
//         fragment Issue_issue on Issue{
//             body
//         }
//     `
// }

function Issue(props){
    const {issue} = props
    return (
        <li><div>{issue.body}</div><div>{issue.createdAt}</div></li>
    )
}
export default createFragmentContainer(Issue,{
    issue:graphql`
        fragment Issue_issue on Issue{
            body
            author{
                login
            }
            url
            createdAt
        }
    `
})