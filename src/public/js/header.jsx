import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header () {
    const [place, setPlace] = useState([]);

    useEffect( () => {
        
    });

    return (
        <>
            <div className="header-container">
                <div className="header-content">
                    <div className="header-item">
                        <Link to='/ById' className="link-text" replace>OneCocktail</Link>
                    </div>
                    <div className="header-item">
                        <Link to='/addCocktail' className="link-text" replace>Create</Link>
                    </div>
                    <div className="header-item">
                        <Link to='/searchContents' className="link-text" replace>Search</Link>
                    </div>
                    <div className="header-item">
                        <Link to='/register' className="link-text" replace>Register</Link>
                    </div>
                </div>
            </div>
        </>
        )
};

export default Header;
