import React, {useState} from 'react';
import graphql from 'babel-plugin-relay/macro';
import {createPaginationContainer} from "react-relay";
import Issue from './Issue'

function Issues(props) {
    const [refetching, setRefetching] = useState(false);
    const {viewer, relay} = props
    const _refetch = () => {
        if (refetching) return;
        setRefetching(true);
        relay.refetchConnection(
            1, (error) => {
                error && console.error(error)
                setRefetching(false);
            }, {
                //获取下一条issue
                cursor: props?.viewer?.issues?.pageInfo?.endCursor,
                login: props.viewer.login,
            })
    }
    const _loadMore = () => {
        console.log('loadMore')
        if (!relay.hasMore() || relay.isLoading()) {
            return;
        }

        relay.loadMore(
            1,  // Fetch the next 10 feed items
            error => {
                console.log(error);
            },
        );
    }
    return (
        <div>
            <h1>Issues</h1>
            <button onClick={() => _refetch()} disabled={refetching}>refetch</button>
            <ol>
                {viewer.issues.edges.map(issueEdge => {
                    // return <div>id:{issueEdge.node.id}</div>
                    return <Issue key={issueEdge.node.id} issue={issueEdge.node}/>
                })}
            </ol>
            <button onClick={() => _loadMore()}>load more</button>
        </div>
    )
}

const fragment = {
    viewer: graphql`
        fragment Issues_viewer on User @argumentDefinitions(
            count: {type:"Int",defaultValue:1}
            after: {type:"String"}
        ){
            login
            issues(
                first: $count
                after: $after
            )@connection(key:"Issues_issues"){
                pageInfo{
                    endCursor
                    hasNextPage
                }
                edges{
                    cursor
                    node{
                        id
                        ...Issue_issue
                    }
                }
            }
        }
    `
}

const query = graphql`
    # Pagination query to be fetched upon calling 'loadMore'.
    # Notice that we re-use our fragment, and the shape of this query matches our fragment spec.
    query IssuesPaginationQuery(
        $count: Int!
        $cursor: String
        $login: String!
    ) {
        viewer: user(login: $login) {
            ...Issues_viewer @arguments(count: $count, after: $cursor)
        }
    }
`

const connectionConfig = {
    direction: 'forward',
    getConnectionFromProps(props) {
        return props?.viewer?.issues || null;
    },
    getFragmentVariables(prevVars, totalCount) {
        // console.log("gFV")
        // console.log(prevVars, totalCount)
        return {
            // ...prevVars,
            login: prevVars?.login,
            after: prevVars?.cursor,
            count: totalCount,
        };
    },
    getVariables(props, {count, cursor}, fragmentVariables) {
        // console.log("gv")
        // console.log(props, {count, cursor}, fragmentVariables)
        return {
            count,
            cursor: cursor || fragmentVariables.after,
            login: props.viewer.login,
        };
    },
    query: query
}

export default createPaginationContainer(Issues, fragment, connectionConfig);