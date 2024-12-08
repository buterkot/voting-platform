import React, { useEffect } from "react";
import Login from "../components/forms/Login.js";

function Authorization() {
    useEffect(() => {
        document.title = "Авторизация"; 
      }, []);

    return (
        <div className="main">
            <Login/>
        </div>
    )

}

export default Authorization