import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TweetAnalysisForm from "./components/TweetAnalysisForm.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tweet" element={<TweetAnalysisForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
