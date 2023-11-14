import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';
import './App.css';
import CustomerList from './CustomerList';
import Message from './Message';
import UserList from './UserList';
import Laskuri from './laskuri';
import Posts from './Posts'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductList from './ProductList';

import { Switch, Route, Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

function App() {

const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)
const [loggedUser, setLoggedUser] = useState('')
const [adminUser, setAdminUser] = useState(null)

useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedUser(storedUser)
  }
  
},[])

const logout = () => {
  localStorage.clear()
  setLoggedUser('')
  setAdminUser('')
}

  return (
    
    <div className="App">
      
      {!loggedUser &&  <div>
      <Login setMessage={setMessage} 
      setIsPositive={setIsPositive} 
      setShowMessage={setShowMessage}
      setLoggedUser={setLoggedUser}
      setAdminUser={setAdminUser}/>
      {showMessage && <Message message={message} isPositive={isPositive} />}
      </div>
      
      }

      {loggedUser && 
      <Router>
        <Navbar bg="dark" variant='dark'>
          <Nav className='mr-auto'>
            <Link to={'/Customers'} className='nav-link'>Customers</Link>
            {console.log("AdminUser accesslevelId:", adminUser)}
            {adminUser === 1 && (
              <Link to={'/Users'} className='nav-link'>Users</Link>
            )}
            <Link to={'/laskuri'} className='nav-link'>Laskuri</Link>
            <Link to={'/Posts'} className='nav-link'>Typicode posts</Link>
            <Link to={'/Products'} className='nav-link'>Products</Link>
            <button className='nav-link' onClick={() => logout()}>Logout</button>
            <button className='nav-link'>Moi {loggedUser}</button>
          </Nav>
        </Navbar>
        <br/>
        <h1>Northwind traders</h1>
        <br/>
              
        {showMessage && <Message message={message} isPositive={isPositive} />}

        <Switch>
          <Route path='/Customers'> <CustomerList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} /></Route>
          <Route path='/Users'><UserList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} /></Route>
          <Route path='/laskuri'><Laskuri/></Route>
          <Route path='/Posts'><Posts/></Route>
          <Route path='/Products'><ProductList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage}/></Route>

        </Switch>

      </Router>
      
      }    
      
      </div>
    
  );
}

export default App;