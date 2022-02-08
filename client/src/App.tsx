import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import 'fomantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <MenuBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
