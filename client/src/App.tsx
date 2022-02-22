import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/login'
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path='/register'
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
