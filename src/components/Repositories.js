import React from "react";
import {renderRoutes} from "react-router-config";

function Repositories({route}) {
    return (
        <div>
            <h1>Repositories</h1>
            {renderRoutes(route.routes)}
        </div>
    )
}

export default Repositories;