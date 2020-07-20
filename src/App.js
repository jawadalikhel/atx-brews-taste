import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import BrewTour from './mainComponents/brew-components/BrewTour';
import NavBar from '../src/mainComponents/ui-components/NavBar';
import Login from './mainComponents/auth/Login';
import MainComponent from './mainComponents/brew-components/brewsLandingPage';
import Register from './mainComponents/auth/Register';
import OtherMap from './mainComponents/brew-components/useTourMap';
function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <Route
        exact path='/'
          render={(props) => <Login  {...props} />}
      />
        <Route path="/register" component={Register}/>
        <Route exact path="/private_user" component={MainComponent}/>
        <Route path="/brewTour" component={BrewTour} />
        <Route path="/OtherMap" component={OtherMap} />
    </div>
  </Router>
  );
}

export default App;
