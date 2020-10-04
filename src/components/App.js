import React from "react";
// import mockapi from "../api/mockapi";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Game from "./Game";

class App extends React.Component{
  
  
  render(){
      return (
        <div>
          <BrowserRouter>
            <div>
              <Header/>
              <Route exact path='/' component={Game} />
            </div>
          </BrowserRouter>
        </div>
      );
  }

}

export default App;
