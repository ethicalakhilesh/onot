import React, { useRef, useState } from "react";
import api from "../apiConfig";

function Entercartoll() {
  const [carregnum, setCarRegNum] = useState("");
  const [tollamt, setTollAmt] = useState("");
  const [displayerrors, setDisplayErrors] = useState("");
  function submit(e) {
    e.preventDefault();
    api
      .post("/entertoll", {
        vehicleregnum: carregnum,
        tollamt: tollamt,
      })
      .then((res) => {
        // console.log(res.data._id);
        if (res.data._id) {
          setDisplayErrors("Toll Added Successfully !");
        } else {
          setDisplayErrors(res.data.message);
        }
      });
  }
  return (
    <>
      <div className="container-fluid">
        <h2>Enter Car Toll</h2>
        {displayerrors ? (
          <div className="alert alert-success" role="alert">
            {displayerrors}
          </div>
        ) : null}
        <form onSubmit={submit}>
          <div className="row">
            <div className="col-md-5">
              <label htmlFor="">Enter Car Registration Number</label>
              <input type="text" className="form-control" placeholder="Enter Car Registartion Number" value={carregnum} onChange={(e) => setCarRegNum(e.target.value)} />
            </div>
            <div className="col-md-5">
              <label htmlFor="">Enter Toll Amount</label>
              <input type="number" className="form-control" placeholder="Enter Amount" value={tollamt} onChange={(e) => setTollAmt(e.target.value)} />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-2">
              <button type="submit" className="form-control btn btn-success">
                Enter Toll
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Entercartoll;
