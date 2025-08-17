import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Quiz from './components/pages/Quiz';
import Answers from './components/pages/Answers';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='quiz' element={<Quiz/>}/>
      <Route path='answers' element={<Answers/>}/>
    </Routes>
  );
}

export default App
