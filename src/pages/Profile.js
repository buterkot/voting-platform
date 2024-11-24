import React, { useState, useEffect } from "react";
import Header from "../components/Header.js";
import "../styles/App.css";

function Profile() {
    useEffect(() => {
        document.title = "Профиль"; 
      }, []);

    return(
        <Header/>
    )
}

export  default Profile