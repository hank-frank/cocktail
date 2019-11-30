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
                <Link to='/oneCocktail'>
                    <button className="random-button" onClick={ ()=> props.getRandom()}>I don't care, give me anything...</button>
                </Link>
            )
        } else {
            setConditionalLink(
                <button className="random-button" onClick={ ()=> props.getRandom()}>I don't care, give me anything...</button>
            )
        }
    }, [window.location.href]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(searchValue)
        props.search(value);
        reset();
    }

    return (
        <>
        <div className="search-section">
        {/* <Link to='/'> */}
            <form onSubmit={ handleSubmit }>
                <label className="search-label">
                    Search by Ingredient:
                    <input
                    className="search-bar"
                    type="text"
                    { ...bind}
                    />
                </label>
                {/* <Link to='/'> */}
                    <input className="submit-button" type="submit" value="Search" />
                {/* </Link> */}
            </form>
            {/* </Link> */}
        </div>
        <div className="random-flex">
            { conditionalLink }
        </div>
        </>
    )
};

export default SearchBar;