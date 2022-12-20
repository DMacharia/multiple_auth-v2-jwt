import { useState } from "react";
import { Link } from "react-router-dom";
function NewPatient({ setStoredToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(roles);

    fetch("/api/v1/users", {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          roles,
        },
      }),
    });

    setUsername("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="App">
      <h1>Create a new Patient or user </h1>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>Role:</label>
        <select
          onChange={(e) => setRoles(e.target.value)}
          name="roles"
          value={roles}
          required
        >
          <option value="" selected>
            Pick one
          </option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default NewPatient;
