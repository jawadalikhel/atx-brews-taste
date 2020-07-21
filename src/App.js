import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BrewTour from './mainComponents/brew-components/BrewTour';
import NavBar from '../src/mainComponents/ui-components/NavBar';
import Login from './mainComponents/auth/Login';
import privateLandingPage from './mainComponents/brew-components/privateLandingPage';
import Register from './mainComponents/auth/Register';
import UserTourMap from './mainComponents/brew-components/useTourMap';
import LandingPage from './mainComponents/ui-components/landingPage/index'

function App() {
  return (
    <Router>
    <div className="">
      <NavBar />
      <Route exact path="/" component={LandingPage}/>

      <Route
         path='/login'
          render={(props) => <Login  {...props} />}
      />
        <Route path="/register" component={Register}/>
        <Route path="/private_user" component={privateLandingPage}/>
        <Route path="/brewTour" component={BrewTour} />
        <Route path="/userTours" component={UserTourMap} />
    </div>
  </Router>
  );
}

export default App;
