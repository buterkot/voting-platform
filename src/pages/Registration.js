import React, { useState, useEffect } from "react";
import Signup from "../components/forms/Signup.js";

function Registration() {
    useEffect(() => {
        document.title = "Регистрация"; 
      }, []);

    return (
        <div className="main">
            <Signup/>
        </div>
        
    )

}

export default Registration