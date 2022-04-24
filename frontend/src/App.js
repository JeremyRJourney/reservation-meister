import React from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import styled from 'styled-components'

import './App.css'

import Main from './pages/Main'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Manage from './pages/Manage'

function App() {
    const path = useLocation().pathname
    if (!localStorage.getItem('isAuthed')) {
      if (path !== "/login") {
        return <Navigate to="/login" replace />
      }
    }

  return (
    <Wrapper>
      <Routes>
        <Route path="/" exact element={<Main/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #1E2943;
  height: 100vh;
  width: 100vw;

`


export default App;
