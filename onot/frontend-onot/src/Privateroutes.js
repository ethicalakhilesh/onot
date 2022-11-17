import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "./apiConfig";

function Privateroute(props) {
  const [islog, setIsLogIn] = useState(false);
  const { children } = props;
  function isLoggedIn() {
    api.get("/user").then((res) => {
      if (res.data._id !== "") {
        setIsLogIn(true);
      }
    });
  }
  isLoggedIn();
  if (islog === true) {
    return children;
  } else {
    return (
      <div>
        Not Logged In ! Please <Link to="/login">Login Here</Link>
      </div>
    );
  }
}

export default Privateroute;
