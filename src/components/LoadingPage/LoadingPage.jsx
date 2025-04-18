// Loading.js
import React from 'react';
import './Loading.css'; // Import the CSS file

export default function LoadingPage() {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

