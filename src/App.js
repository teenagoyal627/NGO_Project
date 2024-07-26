import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from 'react';
import Form from './Component/PatientForm/MainPage.js/FormPage';
import Login from './Component/Authentication/Login/Login';
import Signup from "./Component/Authentication/Signup/Signup";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FrontPage from "./Component/FrontPage/FrontPage";
import AllPatientDetails from "./Component/PatientData/MainPage/PatientDetails";
// import FilterData from "./Component/PatientData/Filter/MainFilter";

const App = () => {
  return (
    <Router>
      <div>
        
        <Switch>
        <Route path='/'exact><FrontPage/></Route>
          <Route  path="/form/:id?" component={Form} />
          <Route exact path="/login" component={Login} />
          <Route path="/signup" component={Signup}/>
          <Route path="/patientdata" component={AllPatientDetails}/>
          {/* <Route path="/report" component={FilterData}/> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;


// yarn start
// start mongodb
//run server by node Server.js in terminal