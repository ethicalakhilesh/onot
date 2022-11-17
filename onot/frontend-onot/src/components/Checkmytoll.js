import React, { useEffect, useState } from "react";
import api from "../apiConfig";

function Checkmytoll(props) {
  const [ownerid, setOwnerId] = useState([]);
  const [totaltolls, setTotalTolls] = useState([]);
  const usrid = props.userId;

  function fetchVehicleTollData(userid) {
    api.get("/searchusertoll/" + userid).then((res) => {
      setTotalTolls(res.data);
    });
  }
  useEffect(() => {
    fetchVehicleTollData(props.userId);
  }, []);
  return (
    <>
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
      <div className="row">
        <div className="col-md-2">
          <button className="btn btn-success">Pay</button>
        </div>
      </div>
    </>
  );
}

export default Checkmytoll;
