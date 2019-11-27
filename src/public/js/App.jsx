import React, { useState, useEffect } from 'react';
// import { HashRouter as Router, Route } from 'react-router-dom';

import Header from './header.jsx';
import Search from './search.jsx';

function App() {
    const [cocktail, setCocktail] = useState({});
    const [searchResult, setSearchResult] = useState([]);


    function apiTest () {
    console.log(searchResult)
    fetch(`/randomCocktail`)
        .then((response) => {
            return response = response.json()
        })
        .then((data) => {
            setCocktail(data);
        })
        .catch(err => console.error(`whoopsies`, err))
    };

    const test2 = (searchValue) => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`)
        .then((response) => {
            return response = response.json()
        })
        .then ((data) => {
            setSearchResult(data.drinks)
            console.log(data.drinks)
        })
        .catch(err => console.error(`whoopsies2`, err))
    }

    return(
        <>
        <Header />
        <button className="test-button" onClick={ ()=> apiTest()}>Testing!</button>
        <button className="test-button" onClick={ ()=> test2()}>Test 2</button>
        <Search 
            search = { test2 }
            resultArray = { searchResult }
        />
        </>
    )
};

export default App;
