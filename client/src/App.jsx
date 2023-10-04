import { BrowserRouter, Routes, Route } from "react-router-dom";

// import ProtectedRoute from "./ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportTweet from './components/ReportTweet.jsx'
import Home from "./pages/Home.jsx";
import UserDashboard from "./pages/dashboard/UserDashboard.jsx";
import Settings from "./pages/dashboard/Settings";
import Profile from "./pages/Profile.jsx";
import AnalyseTweet from "./components/AnalyseTweet.jsx";
import AddGuardian from "./components/AddGuardian";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  
  // const dashboardStyle = {
  //   backgroundColor: darkMode ? "#333" : "#fff",
  //   color: darkMode ? "#fff" : "#333",
  //   transition: "background-color 0.3s, color 0.3s",
  // };

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // };
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
              // <ProtectedRoute>
              //   <UserDashboard />
              // </ProtectedRoute>
              <UserDashboard/>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/guardian" element={<AddGuardian />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
