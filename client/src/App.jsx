import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportTweet from "./components/ReportTweet.jsx";
import Home from "./pages/Home.jsx";
import UserDashboard from "./pages/dashboard/UserDashboard.jsx";
import Settings from "./pages/dashboard/Settings";
import Profile from "./pages/Profile.jsx";
import AnalyseTweet from "./components/AnalyseTweet.jsx";
import AddGuardian from "./components/AddGuardian";
import DisplayGuardian from "./components/DisplayGuardian";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tweet" element={<AnalyseTweet />} />
          <Route path="/report" element={<ReportTweet />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
              // <UserDashboard/>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/guardian" element={<AddGuardian />} />
          <Route path="/testing" element={<DisplayGuardian />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
