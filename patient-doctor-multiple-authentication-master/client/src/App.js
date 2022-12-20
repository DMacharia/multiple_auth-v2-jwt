import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hello from "./Hello";
import Login from "./Login";
import NewPatient from "./NewPatient";
import PatientNavbar from "./PatientNavbar";
import AdminNavbar from "./AdminNavbar";
import DoctorNavbar from "./DoctorNavbar";

function App() {
  const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState("");
  const [role , setRole] = useState("")
  useEffect(() => {
    fetch("/api/v1/profile ", {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.user.username);
        setRole(data.user.roles)
      });
  }, []);

  return (
    <div>
      {storedToken ? (
        <Router>
          {role === "admin" && <AdminNavbar />}
          {role === "patient" ? <PatientNavbar /> : <DoctorNavbar />}

          <Routes>
            <Route
              path="/"
              element={
                <Hello
                  name={name}
                  setStoredToken={setStoredToken}
                  storedToken={storedToken}
                />
              }
            />
            {role === "admin" ? (
              <Route path="/newpatient" element={<NewPatient />} />
            ) : null}
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Login setStoredToken={setStoredToken} />}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
