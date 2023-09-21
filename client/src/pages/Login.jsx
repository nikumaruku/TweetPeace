import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      // res.status(200).send({ message: "User has been logged in" }); Check why error??
      navigate("/tweet");
    } catch (err) {
      console.log(err);
      alert("Username or password is incorrect! Please try again");
    }
  };

  return (
    <AuthForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={handleLogin}
    />
  );
};

export default Login;
