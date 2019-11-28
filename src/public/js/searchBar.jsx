import React, { useState, useEffect } from 'react';
import { useInput } from '../../hooks/useInput.jsx';


function SearchBar (props) {
    const [searchValue, setSearchValue] = useState("");
    const {value, bind, reset } = useInput('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(searchValue)
        props.search(value);
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
                <input className="submit-button" type="submit" value="Search" />
            </form>
        </div>
        <div className="random-flex">
            <button className="random-button" onClick={ ()=> getRandomCocktail()}>I don't care, give me anything...</button>
        </div>
        </>
    )
};

export default SearchBar;