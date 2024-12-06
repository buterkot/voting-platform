import React, { useState, useEffect } from "react";
import Header from "../components/Header.js";
import CreateVote from "../components/forms/CreateVote.js";
import "../styles/App.css";

function Admin() {
    useEffect(() => {
        document.title = "Администратор";
    }, []);

    return (
        <div>
            <Header />
        </div>

    )
}

export default Admin