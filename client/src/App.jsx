import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TweetAnalysisForm from "./components/TweetAnalysisForm.jsx";
import Auth from "./pages/Auth.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/tweet" element={<TweetAnalysisForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
