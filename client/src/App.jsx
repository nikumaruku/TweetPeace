import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TweetAnalysisForm from "./components/TweetAnalysisForm.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navbar />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tweet" element={<TweetAnalysisForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
