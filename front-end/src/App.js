import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Nav from './pageComponents/Nav'
import About from './pages/About'
import Shop from './pages/Shop'
import ItemDetail from './pages/ItemDetail'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />

        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />        
        <Route path='/shop' exact component={Shop} />
        <Route path='/shop/:id' component={ItemDetail} />
        
      </div>
    </Router>
  )
}


export default App;
