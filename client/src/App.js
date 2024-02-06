import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './pages/Home/Home';
import {Books} from "./pages/Books/Books";
import BookDes from "./pages/BookDescription/BookDes";
import NavBar from "./components/NavBar/NavBar";
function App() {
  return (
    <div >
     <BrowserRouter>
     <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/book/:bookId" element={<BookDes />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
