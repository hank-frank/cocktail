import React, { useState, useEffect } from 'react';


function Search (props) {
    const [searchValue, setSearchValue] = useState("")

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(searchValue)
        props.search(searchValue);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
        <label>
            Type of Booze:
            <input
            type="text"
            value={ searchValue }
            onChange={e => setSearchValue(e.target.value)}
            />
        </label>
        <input type="submit" value="Submit" />
        </form>
        </>
    )
};

export default Search;