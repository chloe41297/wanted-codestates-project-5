import React from "react";
import "./App.css";
import PixelMain from "./pages/PixelMain";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PixelDetails from "pages/PixelDetails";
import Home from "pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/pixel" element={<PixelMain></PixelMain>}></Route>
          <Route
            path="/pixel/products/:keyword"
            element={<PixelDetails></PixelDetails>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
