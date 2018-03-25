import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignupPage from './pages/signupPage';
import LoginPage from './pages/loginPage';
import ReservationBox from './reservation/reservation-box';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/register" component={SignupPage} />
          <Route path="/login" component={LoginPage}/>
          <Route path="/reserve-slot" component={ReservationBox}/>
        </div>
      </Router>
    );
  }
}

export default App;