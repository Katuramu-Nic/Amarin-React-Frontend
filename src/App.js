import logo from './logo.svg';
import './App.css';
import{Home} from './Home';
import{Customers} from './Customers';
import{Employees} from './Employees';
import{Departments} from './Departments';



import {BrowserRouter, Route, Switch,NavLink} from 'react-router-dom';
//import { NavLink } from 'react-bootstrap';


function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="m-3 d-flex justify-content-center">
      Amarin-FirstInterview
      </h3>
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
       <ul className="navbar-nav">
         <li className="nav-item- m-1">
           <NavLink className="btn btn-light btn-outline-primary" to="/home">
             Home
           </NavLink>
         </li>
         <li className="nav-item- m-1">
           <NavLink className="btn btn-light btn-outline-primary" to="/departments">
             Deparments
           </NavLink>
         </li>
         <li className="nav-item- m-1">
           <NavLink className="btn btn-light btn-outline-primary" to="/employees">
            Employees
           </NavLink>
         </li>
         <li className="nav-item- m-1">
           <NavLink className="btn btn-light btn-outline-primary" to="/customers">
             Customers
           </NavLink>
         </li>
         
      
         </ul> 
      </nav>
      <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/departments' component={Departments}/>
          <Route path='/employees' component={Employees}/>
          <Route path='/customers' component={Customers}/>
         
          
        </Switch>
</div>
</BrowserRouter>
  );
}

export default App;
