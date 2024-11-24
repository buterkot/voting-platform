import React, { useState, useEffect } from "react";
import Login from "../components/forms/Login.js";

function Authorization() {
    useEffect(() => {
        document.title = "Авторизация"; 
      }, []);

    return (
        <Login/>
    )

}

export default Authorization