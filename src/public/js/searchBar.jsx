import React, { useState, useEffect } from 'react';
import { Link, Redirect, withRouter, History } from 'react-router-dom';

import { useInput } from '../../hooks/useInput.jsx';


function SearchBar (props) {
    const [searchValue, setSearchValue] = useState("");
    const [conditionalLink, setConditionalLink] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const {value, bind, reset } = useInput('');

    useEffect(() => {
        if (window.location.href === 'http://localhost:8000/#/oneCocktail') {
            setConditionalLink(
                    <button className="random-button" onClick={ ()=> props.getRandom()}>I don't care, give me anything...</button>
            )
        } else {
            setConditionalLink(
                <Link to='/oneCocktail'>
                    <button className="random-button" onClick={ ()=> props.getRandom()}>I don't care, give me anything...</button>
                </Link>
            )
        }
    }, [window.location.href]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.search(value);
        console.log(value);
        reset();
        setShouldRedirect(true);
        routingForSearch();
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
                    Search by Ingredient:
                    <input
                    className="search-bar"
                    type="text"
                    { ...bind}
                    />
                </label>
                    <input className="submit-button" type="submit" value="Search" />
            </form>
                { routingForSearch() }
        </div>
        <div className="random-flex">
            { conditionalLink }
        </div>
        </>
    )
};

export default SearchBar;
