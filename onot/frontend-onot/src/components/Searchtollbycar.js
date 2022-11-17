import React, { useEffect, useState } from "react";
import api from "../apiConfig";

function Searchtollbycar() {
  const [carregnum, setCarRegNum] = useState("");
  const [totaltolls, setTotalTolls] = useState([]);
  const [displayerrors, setDisplayErrors] = useState("");
  function fetchVehicleTollData(carregnum) {
    api.get("/searchtoll/" + carregnum).then((res) => {
      //   console.log(res.data);
      setTotalTolls(res.data);
    });
  }
  useEffect(() => {
    fetchVehicleTollData();
  }, []);

  return (
    <>
      <h2>Search Car Toll</h2>
      <div className="row">
        <div className="col-md-5">
          <label htmlFor="">Search by Registration Number</label>
          <input type="text" className="form-control" placeholder="Search Registartion Number" value={carregnum} onChange={(e) => setCarRegNum(e.target.value)} />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-2">
          <button type="submit" className="form-control btn btn-success" onClick={() => fetchVehicleTollData(`${carregnum}`)}>
            Search
          </button>
        </div>
      </div>
      {totaltolls ? (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Vehicle Registration Number</th>
              <th scope="col">Toll Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {totaltolls.map((data) => (
              <tr>
                <td>{data.vehicleregnum}</td>
                <td>{data.tollamt}</td>
                <td>{data.createdon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
}

export default Searchtollbycar;
