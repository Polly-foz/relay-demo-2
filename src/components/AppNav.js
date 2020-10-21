import React from "react";
import {Link} from "react-router-dom";

function AppNav() {
    return (
        <nav>
            <ul>
                <li><Link to={'/issues'}>issues</Link></li>
                <li><Link to={'/repositories'}>repositories</Link></li>
            </ul>
        </nav>
    )
}

export default AppNav