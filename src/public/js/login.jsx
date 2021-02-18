import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useInput } from '../../hooks/useInput.jsx';


function Login (props) {
    const { value:username, bind:bindUsername, reset:resetUsername } = useInput('');
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
    // const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        props.login(username, password);
        resetUsername();
        resetPassword();
        // setShouldRedirect(true);
        // routingForSearch();
    }

    const routingForSearch = () => {
        if (props.shouldRedirectAfterLogin) {
            return(
                <Redirect to='/search' />
            )
        };
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            props.resetShouldRedirect();
            props.resetSideContainerView();
        }
        return (() => {
                isMounted = false;
            }
        )   
    }, [props.shouldRedirectAfterLogin])

    return (
        <>
            <div className="login-section">
                <form className="login-container" onSubmit={ handleSubmit }>
                    <label className="search-label">
                        Username:
                        <input
                        className="search-bar"
                        type="text"
                        { ...bindUsername}
                        />
                    </label>
                    <label className="search-label">
                        Password:
                        <input
                        className="search-bar"
                        type="password"
                        { ...bindPassword}
                        />
                    </label>
                        <input className="submit-button" type="submit" value="Login" />
                </form>
                    { routingForSearch() }
            </div>
            <div className="horizontal-center">
                    <p className="login-message">{ props.loginMessage }</p>
            </div>
        </>
    )
};

export default Login;
