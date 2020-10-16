import React from 'react';
import {renderRoutes} from "react-router-config";

function Issues({route}) {
    return (
        <div>
            <h1>Issues</h1>
            {renderRoutes(route.routes)}
        </div>
    )
}

export default Issues;