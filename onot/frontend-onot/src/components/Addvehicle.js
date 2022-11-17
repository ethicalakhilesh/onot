import React, { useRef, useState } from "react";
import api from "../apiConfig";

function Addvehicle() {
  const [carregnum, setCarRegNum] = useState("");
  const [carownname, setCarOwnName] = useState("");
  const [usrname, setUsrName] = useState("");
  const [usrpass, setUsrPass] = useState("");
  const [displayerrors, setDisplayErrors] = useState("");

  function submit(e) {
    e.preventDefault();
    api
      .post("/addvehicle", {
        ownername: carownname,
        vehicleregnum: carregnum,
        usrid: usrname,
        password: usrpass,
      })
      .then((res) => {
        // console.log(res.data._id);
        setDisplayErrors("Vehicle Added Successfully ! Your Vehicle ID is " + res.data._id + ".");
      });
  }

  return (
    <div>
      <>
        <h2>Add Vehicle</h2>
        <form onSubmit={submit}>
          {displayerrors ? (
            <div className="alert alert-success" role="alert">
              {displayerrors}
            </div>
          ) : null}
          <div className="row">
            <div className="col-md-5">
              <label htmlFor="">Enter Vehicle Owner Name</label>
              <input type="text" className="form-control" placeholder="Enter Owner Name" value={carownname} onChange={(e) => setCarOwnName(e.target.value)} />
            </div>
            <div className="col-md-5">
              <label htmlFor="">Enter Vehicle Registration Number</label>
              <input type="text" className="form-control" placeholder="Enter Car Registartion Number" value={carregnum} onChange={(e) => setCarRegNum(e.target.value)} />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-5">
              <label htmlFor="">Create Username</label>
              <input type="text" className="form-control" placeholder="Enter New UserId" value={usrname} onChange={(e) => setUsrName(e.target.value)} />
            </div>
            <div className="col-md-5">
              <label htmlFor="">Create Password</label>
              <input type="password" className="form-control" placeholder="Enter Password" value={usrpass} onChange={(e) => setUsrPass(e.target.value)} />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-2">
              <button type="submit" className="form-control btn btn-success">
                Add Vehicle
              </button>
            </div>
          </div>
        </form>
      </>
    </div>
  );
}

export default Addvehicle;
