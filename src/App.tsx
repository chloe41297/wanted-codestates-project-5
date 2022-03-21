import React from "react";
import "./App.css";
import PixelMain from "./pages/PixelMain";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/pixel" element={<PixelMain></PixelMain>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
