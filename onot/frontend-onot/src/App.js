import "./App.css";
import "./style.css";
import Login from "./components/Login";
import Custlogin from "./components/Custlogin";
import Dashboard from "./components/Dashboard";
import Privateroute from "./Privateroutes";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import LoginPrivate from "./LoginPrivate";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

const api = axios.create({
  baseURL: `http://localhost:4000`,
  withCredentials: true,
});

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="dashboard/*"
          element={
            <Privateroute>
              <Dashboard />
            </Privateroute>
          }
        />
        <Route
          exact
          path="login"
          element={
            <LoginPrivate>
              <Login />
            </LoginPrivate>
          }
        />
        <Route
          exact
          path="customerlogin"
          element={
            <LoginPrivate>
              <Custlogin />
            </LoginPrivate>
          }
        />
        <Route exact path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
