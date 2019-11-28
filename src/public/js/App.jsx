import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Header from './header.jsx';
import SearchBar from './searchBar.jsx';
import SearchResults from './searchResults.jsx';
import History from './history.jsx';
import Favorites from './favorites.jsx';
import Cocktail from './oneCocktail.jsx';

function App() {
    const [randomCocktail, setRandomCocktail] = useState({});
    const [byId, setById] = useState({});
    const [searchResult, setSearchResult] = useState([]);


    const getRandomCocktail = () => {
        fetch(`/randomCocktail`)
            .then((response) => {
                return response = response.json()
            })
            .then((data) => {
                setRandomCocktail(data);
                
            })
            .catch(err => console.error(`whoopsies random`, err))
    };

    const searchByIngredient = (searchValue) => {
        fetch(`byIngredient?search=${searchValue}`)
        .then((response) => {
            return response = response.json()
        })
        .then ((data) => {
            setSearchResult(data)
        })
        .catch(err => console.error(`whoopsies ingredient`, err))
    }

    const getById = (cocktailId) => {
        fetch(`byId?id=${cocktailId}`)
        .then((response) => {
            return response = response.json()
        })
        .then ((data) => {
            setById(data);
        })
        .catch(err => console.error(`whoopsies byId`, err))
    }

    const forTesting = () => {
        // getById(12402);
        console.log(`random cocktail: `, randomCocktail);
        console.log(`cocktail byId: `, byId);
    }

    return(
        <Router>
            <Header />
            <button className="test-button" onClick={ ()=> getRandomCocktail()}>I don't care, give me anything...</button>
            <button className="test-button" onClick={ ()=> forTesting()}>Test 2</button>
            <SearchBar 
                search = { searchByIngredient }
            />
            <div className="main-container">
            <div className="left-area-container">
            <Route exact path="/">
                <SearchResults
                    drinksArray = { searchResult }
                    getById = { getById }
                />
            </Route>
            <Route path='/OneCocktail'>
                <Cocktail
                    drinksArray = { searchResult }
                    randomCocktail = { randomCocktail }
                    byId = { byId }
                />
            </Route>
            </div>
                <div className="side-container">
                    <History />
                    <Favorites />
                </div>
            </div>
        </Router>
    )
};

export default App;
