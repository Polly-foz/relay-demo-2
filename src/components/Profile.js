import React from "react";
import graphql from 'babel-plugin-relay/macro';
import {createFragmentContainer} from "react-relay";

function Profile(props) {
    const {login,url,avatarUrl} = props.viewer
    return (
        <div>
            <div><a href={url}><img src={avatarUrl} alt={login}/></a></div>
            <div><a href={url}>{login}</a></div>
        </div>
    )
}

export default createFragmentContainer(Profile, {
    viewer: graphql`
        fragment Profile_viewer on User{
            login
            url
            avatarUrl
        }
    `
});