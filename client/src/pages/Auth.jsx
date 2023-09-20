import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      res.status(200).send({ message: "User has been logged in" });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Username or password is incorrect! Please try again");
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={handleLogin}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="mx-auto mt-10">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8"
      >
        <p className="text-black font-bold font-xl px-10">
          Login Form
        </p>
        <h2 className="text-2xl mb-6">{label}</h2>
        <div className="mb-4 ">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {label}
        </button>
      </form>
    </div>
  );
};

export default Auth;
