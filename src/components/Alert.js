import React from "react";
import "../styles/Alert.css";

const Alert = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="custom-alert">
            <span>{message}</span>
            <button className="close-alert" onClick={onClose}>×</button>
        </div>
    );
};

export default Alert;