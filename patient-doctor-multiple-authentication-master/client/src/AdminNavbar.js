import React from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <div>
      <Link to="/newpatient">New Patient</Link>
    </div>
  );
}

export default AdminNavbar;
