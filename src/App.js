import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./App.css";
import User from "./pages/User";
import { CContainer } from "@coreui/react";
import jwt_decode from "jwt-decode";
import { CButton } from "@coreui/react";

function App() {
  const [user, setUser] = useState({});

  const handleCallbackResponse = (res) => {
    console.log("JWT token", res);
    let userObj = jwt_decode(res.credential);
    console.log("userObj", userObj);
    setUser(userObj);
    document.getElementById("btnDiv").hidden = true;
  };

  const onHandleSignout = (event) => {
    setUser({});
    document.getElementById("btnDiv").hidden = false;
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "664432109320-tbg43kl48d4e7oqv2pdjck37nt2397nj.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("btnDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div
        id="btnDiv"
        style={{ width: "200px", marginLeft: "43%", marginTop: "10%" }}
      ></div>

      <CContainer>
        {Object.keys(user).length != 0 && (
          <>
            <CButton onClick={(e) => onHandleSignout(e)}>Sign out</CButton>
            <User />
          </>
        )}
      </CContainer>
    </>
  );
}

export default App;
