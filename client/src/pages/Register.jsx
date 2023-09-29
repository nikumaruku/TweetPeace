import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import Confirmation from "../components/modals/confirmation.jsx";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const load = await axios.post("http://localhost:3001/register", {
        username,
        password,
        email,
        age,
      });
      console.log(load);
      // alert("Registration successful! Please proceed to login");
      setShowConfirmation(true);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setShowConfirmation(true);
      // alert("Something went wrong! Please try again");
    }
  };

  return (
    <>
      <AuthForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        email={email}
        setEmail={setEmail}
        age={age}
        setAge={setAge}
        label="Register"
        onSubmit={handleRegister}
      />
      {showConfirmation && (
        <Confirmation onClose={() => setShowConfirmation(false)} />
      )}
    </>
  );
};

export default Register;
