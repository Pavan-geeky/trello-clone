import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login'
import SignUp from './components/SignUp';
import Home from './components/Home';
import UsersHome from './components/UsersHome';
import ProjectDetails from './components/ProjectDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/project/:id' component={ProjectDetails}></Route>
          <Route path='/signup' component={SignUp}></Route>
          <Route path='/usershome' component={UsersHome}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
