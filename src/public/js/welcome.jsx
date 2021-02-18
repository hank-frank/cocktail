import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Welcome (props) {
    
    useEffect(() => {
    }, [props]);
    
    return (
        <>
            <div className="welcome-container">
                <h2 className="welcome-title">Find some cocktails!</h2>
            </div>
        </>
    )
};

export default Welcome;