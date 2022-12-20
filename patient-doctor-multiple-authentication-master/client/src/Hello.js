import React from "react";

function Hello({ setStoredToken, name }) {
  console.log(name);
  return (
    <div>
      Hello {name}
      <button
        onClick={() => {
          localStorage.setItem("token", "");
          setStoredToken("");

          alert("You have been logged out");
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default Hello;
