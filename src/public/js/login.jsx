import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useInput } from '../../hooks/useInput.jsx';


function Login (props) {
    const { value:username, bind:bindUsername, reset:resetUsername } = useInput('');
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`user: `, username);
        console.log(`password: `, password);

        props.login(username, password);
        resetUsername();
        resetPassword();
        // setShouldRedirect(true);
        // routingForSearch();
    }

    const routingForSearch = () => {
        if (shouldRedirect === true) {
            return(
                <Redirect to='/searchContents' />
            )
        };
    };

    useEffect(() => {
        setShouldRedirect(false);
    }, [shouldRedirect])

    return (
        <>
            <div className="search-section">
                <form onSubmit={ handleSubmit }>
                    <label className="search-label">
                        Pick a username:
                        <input
                        className="search-bar"
                        type="text"
                        { ...bindUsername}
                        />
                    </label>
                    <label className="search-label">
                        Pick a password:
                        <input
                        className="search-bar"
                        type="text"
                        { ...bindPassword}
                        />
                    </label>
                        <input className="submit-button" type="submit" value="Login" />
                </form>
                    {/* { routingForSearch() } */}
            </div>
            <div className="horizontal-center">
                    <p className="login-message">{ props.loginMessage }</p>
            </div>
        </>
    )
};

export default Login;
