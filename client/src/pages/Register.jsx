import axios from "axios";
import { useState } from "react";
import AuthForm from "../components/AuthForm.jsx";
import Confirmation from "../components/modals/confirmation.jsx";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("http://localhost:3001/register", {
        username,
        password,
        email,
        age,
      });
      console.log({user});

      
      setShowConfirmation(true);
    } catch (err) {
      console.log(err);
      alert("Error occurs! Please try registering again");
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
