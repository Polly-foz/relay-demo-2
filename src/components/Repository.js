import React from "react";
import {renderRoutes, matchRoutes} from "react-router-config";

function Repository({route}) {
    console.log('Repository',route)
    return (
        <div>
            <h2>Repository</h2>
            {renderRoutes(route.routes,{someProp: "extra props"})}
        </div>
    )
}

export default Repository;