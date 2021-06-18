import React, {useCallback, useContext, useState} from "react";
import "./style.css";
import {Button, Input} from "@material-ui/core";
import {AppContext} from "../AppHandler/AppContext";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const { login } = useContext(AppContext);

  const handleLogin = useCallback(() => {
    if (email.length === 0 || email.indexOf("@") === -1) {
      alert("Please enter an email address");
      return;
    }

    login(email)
      .catch(error => {
        console.error(error);
        alert(`Problem logging in: ${error.message}`);
      })
  }, [email, login]);

  return <div className="component-LoginPage">
    <div className="login-dialog">
      <img src="https://srv-01-ap-southeast-2.data.propelleraero.com/or2e3858fa/logo-8225c27c.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly8qL29yMmUzODU4ZmEvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYyNTA0NTExM319fV19&Signature=r0wwlfCetm9ybo2axTqFfHEjFAGeb2KGPrtULOX~U4Za~-lvn66Tqa3TItI5sLIvR5PS~mT4Hs6FBJ12C5STH3Kgr4zaLRL-SzQX9V-frfpiDEA3pHjHApNxKmbjV2CxdP0g7Z2Fx3proQnddX1lcyI3aELTvpGettuhdGtHAxRs4rP6BDXCdjeDD42NNRqXYpmtn7kmX3Ad4y8~4RENXRLuHZ0eyEBiqQTvg24m~m-rLbPvK-HVbrITVdFrx3kCkctsQBustUQHMOwtf9eB-Luzlq2fHtQm-BgYpKl7U~6eR9dXQ0dvGEXrAWpTOLoJMF~FS3aF5xFlNhwrtIyolw__&Key-Pair-Id=APKAI6AKZOWIA7VNVEUQ&response-content-disposition=attachment&response-cache-control=max-age=31536000" alt="" />

      <Input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        className="login-input"
      />

      <Input
        placeholder="Password"
        fullWidth
        className="login-input"
      />

      <Button
        onClick={handleLogin}
        type="submit"
        className="login-submit"
      >
        Sign in
      </Button>
    </div>
  </div>
};
