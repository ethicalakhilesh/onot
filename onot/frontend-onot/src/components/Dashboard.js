import React, { useState, useEffect } from "react";
import api from "../apiConfig";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import DashPrivateRoutes from "../DashPrivateRoutes";
import Entercartoll from "./Entercartoll";
import Searchtollbycar from "./Searchtollbycar";
import Addvehicle from "./Addvehicle";
import Checkmytoll from "./Checkmytoll";

function Dashboard() {
  const [usrrole, setUserRole] = useState("");
  const [usrid, setUserId] = useState("");
  const [usrname, setUserName] = useState("");
  const nav = useNavigate();
  function logoutfn() {
    api.get("/logout").then((res) => {
      if (res.data.message === "Logout Success") {
        nav("/login");
      }
    });
  }
  function isLoggedIn() {
    api.get("/user").then((res) => {
      if (res.data._id !== "") {
        setUserRole(res.data.userrole);
        setUserId(res.data._id);
        setUserName(res.data.name);
      }
    });
  }
  isLoggedIn();
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  return (
    <>
      <nav>
        <button className="btn btn-warning" onClick={openNav}>
          &#9776;
        </button>
        <div id="mySidenav" className="sidenav">
          <a className="closebtn" onClick={closeNav}>
            &times;
          </a>
          <div className="logo-circular-image">
            <h2>One Nation One Tag</h2>
          </div>
          <br />
          <h4>Hi, {usrname}</h4>
          <br />
          {usrrole === "MEMBER" || usrrole === "ADMIN" ? (
            <>
              <Link to="">
                <i className="fas fa-chart-line"></i> Dashboard
              </Link>
            </>
          ) : null}
          {usrrole === "ADMIN" ? (
            <>
              <Link to="enter-car-toll">
                <i className="fas fa-car"></i> Enter Vehicle Toll
              </Link>
              <Link to="search-toll">
                <i className="fas fa-car"></i> Search Toll
              </Link>
              <Link to="add-vehicle">
                <i className="fas fa-car"></i> Add Vehicle
              </Link>
            </>
          ) : null}
          {usrrole === "MEMBER" ? (
            <>
              <Link to="check-my-toll">
                <i className="fas fa-car"></i> Check My Toll
              </Link>
            </>
          ) : null}
          {usrrole === "MEMBER" || usrrole === "ADMIN" ? (
            <Link to="" onClick={() => logoutfn()}>
              <i className="fa fa-sign-out"></i> Logout
            </Link>
          ) : null}
        </div>
      </nav>
      <div id="main">
        <Routes>
          <Route path="enter-car-toll" element={<Entercartoll />} />
          <Route path="search-toll" element={<Searchtollbycar />} />
          <Route path="add-vehicle" element={<Addvehicle />} />
          <Route path="check-my-toll" element={<Checkmytoll userId={usrid} />} />
          {/* <Route exact path="*" element={<Dashboard />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default Dashboard;
