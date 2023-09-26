import { BrowserRouter, Routes, Route } from "react-router-dom";

import TweetAnalysisForm from "./components/TweetAnalysisForm.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportTweet from "./pages/ReportTweet";
import Home from "./pages/Home.jsx";
import UserDashboard from "./pages/dashboard/UserDashboard.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tweet" element={<TweetAnalysisForm />} />
          <Route path="/report" element={<ReportTweet />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
