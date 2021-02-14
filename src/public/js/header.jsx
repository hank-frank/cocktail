import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header (props) {
    const [place, setPlace] = useState([]);
    const [localLoggedIn, setLocalLoggedIn] = useState(false);
    
    useEffect( () => {
        if (props.isLoggedIn) {
            setLocalLoggedIn(true);
        }
    }, [props.isLoggedIn]);

    const logout = () => {
        props.logout();
    };

    return (
        <>
            <div className="header-container">
                <div className="header-content">
                    { localLoggedIn 
                        ? <>
                        <div className="header-item">
                            <Link to='/search' className="link-text" replace>Search</Link>
                        </div>
                        <div className="header-item">
                            <Link to='/ById' className="link-text" replace>OneCocktail</Link>
                        </div>
                        <div className="header-item">
                            <Link to='/addCocktail' className="link-text" replace>Create</Link>
                        </div>
                        <div className="header-item">
                            <Link to='/searchContents' className="link-text" replace>Search Results</Link>
                        </div>
                        </>
                        : null 
                    }
                    
                    <div className="header-item">
                        <Link to='/register' className="link-text" replace>Register</Link>
                    </div>
                    
                    { localLoggedIn 
                        ?
                        <div className="header-item">
                            <p onClick={ logout } className="link-text">Logout</p>
                        </div>
                        :
                        <div className="header-item">
                            <Link to='/login' className="link-text" replace>Login</Link>
                        </div>
                    }
                    <div className="header-item">
                            <p onClick={ props.testFunct } className="link-text">test</p>
                    </div>
                </div>
            </div>
        </>
        )
};

export default Header;
