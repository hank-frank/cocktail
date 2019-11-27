import React, { useState, useEffect } from 'react';
// import { HashRouter as Router, Route } from 'react-router-dom';
// import { Helmet } from 'react-helmet';

function Header () {
const [place, setPlace] = useState([]);

useEffect( () => {
    
});

return (
    <>
    <div className="header-container">
        <div className="header-content">
            <p className="header-item">Henry's Recipe Viewer</p>
        </div>
    </div>
    </>
    )

};

export default Header;
