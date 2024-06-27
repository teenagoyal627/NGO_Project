import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from 'react';
import Form from './Component/PatientForm/Form';
import Navbar from './Component/Navbar/Navbar';
import Login from './Component/Authentication/Login';
import Signup from "./Component/Authentication/Signup";
import AllPatientDetails from "./Component/PatientData/AllPatientDetails";
import Report from "./Component/PatientData/Report";

const App = () => {
  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Switch>
          <Route  path="/home/:id?" component={Form} />
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup}/>
          <Route path="/patientdata" component={AllPatientDetails}/>
          <Route path="/report" component={Report}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
