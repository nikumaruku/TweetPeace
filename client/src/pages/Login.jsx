import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm.jsx";
import SuccessRegister from "../components/modals/SuccessRegister.jsx";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      setUsername(res.data.username)
      const token = res.data.token;
      localStorage.setItem("token", token); 
      
      navigate(`/dashboard?username=${username}`);
   
    } catch (err) {
      console.log(err);
      alert("Username or password is incorrect! Please try again");
    }
  };

  return (
    <>
      <AuthForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={handleLogin}
      />
      {showConfirmation && (
        <SuccessRegister onClose={() => setShowConfirmation(false)} />
      )}
    </>
  );
};

export default Login;
