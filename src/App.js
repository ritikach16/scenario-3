import React from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Common from "./components/Common/Common";
import Main from "./components/Main/Main";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/detail' element = {<Common/>} />
      <Route path='/' element = {<Main/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
