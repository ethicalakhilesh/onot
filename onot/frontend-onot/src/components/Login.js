import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apiConfig";

function Login(props) {
  const nav = useNavigate();
  const [uemail, setEmail] = useState("");
  const [upassword, setPassword] = useState("");
  const [displayerrors, setDisplayErrors] = useState("");

  function loginuser() {
    api
      .post("/login", {
        usrid: uemail,
        password: upassword,
      })
      .then((res) => {
        if (res.data.message === "Login Success") {
          nav("/dashboard");
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setDisplayErrors("Username OR Password Incorrect");
        } else if (err.response.status === 501) {
          setDisplayErrors(err.res.message);
        }
      });
  }
  return (
    <>
      <div className="container-fluid bg-onot-logo-orange">
        <div className="login-card">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>One Nation One Tag</h1>
            <div className="form-group">
              {displayerrors ? (
                <div className="alert alert-danger" role="alert">
                  {displayerrors}
                </div>
              ) : null}
              <label htmlFor="exampleInputEmail1">Email Employee Id</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your employee id" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-success mt-4" onClick={() => loginuser()}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
