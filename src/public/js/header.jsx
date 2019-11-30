import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            <div className="header-item">
                <Link to='/ById' className="link-text">OneCocktail</Link>
            </div>
            <div className="header-item">
                <Link to='/addCocktail' className="link-text">Create</Link>
            </div>
            <div className="header-item">
                <Link to='/' className="link-text">Search</Link>
            </div>
        </div>
    </div>
    </>
    )

};

export default Header;
