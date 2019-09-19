import React, { Component } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Export from './components/Export/Export';
import Exportlist from './components/Exportlist/Exportlist';
import Collections from './components/Collections/Collections';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
          <Switch>
            <Route path="/Login" component={Login} />
            <Route path="/Home" component={Home} />
            <Route path="/Export" component={Export} />
            <Route path="/Exportlist" component={Exportlist} />
            <Route path="/Collections" component={Collections} />
            <Redirect from="/" exact to="/Login" />
          </Switch>   
      </div>
      </BrowserRouter>
    );
  }
}
export default App;
