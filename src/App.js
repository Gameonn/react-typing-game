import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Header from './Header/Header';
import Home from './Home/Home';
import Game from './Game/Game';
import GameResult from './Game/GameResult/GameResult';

class App extends Component {

    render() {
      return (
          <div className="App">
            <Header />
            <Switch>
              <Route path="/game" component={Game} />
              <Route path="/game-result" render={(props) => <GameResult {...props}/>}/>
              <Route path="/" exact component={Home} />
              <Route render={() => <h1>Not Found</h1>} />
            </Switch>
          </div>
      );
    };

}

export default App;
