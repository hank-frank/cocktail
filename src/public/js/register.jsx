import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useInput } from '../../hooks/useInput.jsx';


function Register (props) {
    const { value:username, bind:bindUsername, reset:resetUsername } = useInput('');
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
    const { value:password2, bind:bindPassword2, reset:resetPassword2 } = useInput('');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`user: `, username);
        console.log(`password: `, password);
        console.log(`pass2: `, password2);

        props.registerUser(username, password, password2);
        resetUsername();
        resetPassword();
        resetPassword2();
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
                    <label className="search-label">
                        Input your password again:
                        <input
                        className="search-bar"
                        type="text"
                        { ...bindPassword2}
                        />
                    </label>
                        <input className="submit-button" type="submit" value="Register" />
                </form>
                    {/* { routingForSearch() } */}
            </div>
            <div className="horizontal-center">
                <p className="login-message">{ props.registerMessage }</p>
            </div>
        </>
    )
};

export default Register;
