import React, { useState } from "react";
import api from "./apiConfig";

function DashPrivateRoutes(props) {
  const [adminusr, setAdminUser] = useState(false);
  const { children } = props;
  function checkusrrole() {
    api.get("/user").then((res) => {
      if (res.data.userrole === "ADMIN") {
        setAdminUser(true);
      }
    });
  }
  checkusrrole();
  if (adminusr === true) {
    return children;
  } else {
    return <div>Unauthorized Access</div>;
  }
  //   return <div>abc</div>;
}

export default DashPrivateRoutes;
