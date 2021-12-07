import Dashboard from 'pages/Dashboard';
import Login from 'pages/Login';
import AskQuestion from 'pages/question/AskQuestion';
import EditQuestion from 'pages/question/EditQuestion';
import Signup from 'pages/Signup';
import React from 'react';
import{BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PrivateRoute from 'routing/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyQuestions from 'pages/question/MyQuestions';
import ViewQuestion from 'pages/question/ViewQuestion';
import AddAnswer from 'pages/answer/AddAnswer';
import Home from 'pages/Home';
import Account from 'pages/Account';

export default function App() {
  return (
    <Router>
    <ToastContainer/>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/question/view/:id" component={ViewQuestion}></Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
        <PrivateRoute exact path="/questions/my" component={MyQuestions}></PrivateRoute>
        <PrivateRoute exact path="/question/ask" component={AskQuestion}></PrivateRoute>
        <PrivateRoute exact path="/question/edit/:id" component={EditQuestion}></PrivateRoute>
        <PrivateRoute exact path="/answer/add/:id" component={AddAnswer}></PrivateRoute>
        <PrivateRoute exact path="/account" component={Account}></PrivateRoute>
      
      </Switch>
    
    
    
    </Router>
  )
}
