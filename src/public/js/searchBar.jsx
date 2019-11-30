import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useInput } from '../../hooks/useInput.jsx';


function SearchBar (props) {
    const [searchValue, setSearchValue] = useState("");
    const [conditionalLink, setConditionalLink] = useState('');
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
    }

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
                {/* <Link to='/searchResults'> */}
                    <input className="submit-button" type="submit" value="Search" />
                {/* </Link> */}
            </form>
        </div>
        <div className="random-flex">
            { conditionalLink }
        </div>
        </>
    )
};

export default SearchBar;
