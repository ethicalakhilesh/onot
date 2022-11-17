import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./apiConfig";

function LoginPrivate(props) {
  const nav = useNavigate();
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
  if (islog !== true) {
    return children;
  } else {
    return nav("/dashboard");
  }
}

export default LoginPrivate;
