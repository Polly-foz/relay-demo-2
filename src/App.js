import React from 'react';
import './App.css';
import {renderRoutes} from "react-router-config";


function App({route}) {
  return (
    <div className="App">
      <h1>App</h1>
      {renderRoutes(route.routes)}
    </div>
  );
}

export default App;
