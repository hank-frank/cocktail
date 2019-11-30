import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Header from './header.jsx';
import SearchBar from './searchBar.jsx';
import SearchResults from './searchResults.jsx';
import History from './history.jsx';
import Favorites from './favorites.jsx';
import Cocktail from './oneCocktail.jsx';
import Create from './createNew.jsx';

function App() {
    const [randomCocktail, setRandomCocktail] = useState({});
    const [byId, setById] = useState({});
    const [searchResult, setSearchResult] = useState([]);
    const [current, setCurrent] = useState({});
    const [historyArray, setHistoryArray] = useState([]);


    const getRandomCocktail = () => {
        fetch(`/randomCocktail`)
            .then((response) => {
                return response = response.json()
            })
            .then((cocktail) => {
                setRandomCocktail(cocktail);
                setCurrent(cocktail);
                let tempHistory = historyArray;
                tempHistory.push(cocktail);
                setHistoryArray(tempHistory);
            })
            .catch(err => console.error(`whoopsies random`, err))
    };

    const searchByIngredient = (searchValue) => {
        fetch(`byIngredient?search=${searchValue}`)
        .then((response) => {
            return response = response.json()
        })
        .then ((cocktailArray) => {
            setSearchResult(cocktailArray)
        })
        .catch(err => console.error(`whoopsies ingredient`, err))
    }

    const getById = (cocktailId) => {
        fetch(`byId?id=${cocktailId}`)
        .then((response) => {
            return response = response.json()
        })
        .then ((cocktail) => {
            setById(cocktail);
            setCurrent(cocktail);
            let tempHistory = historyArray;
            tempHistory.push(cocktail);
            setHistoryArray(tempHistory);
        })
        .catch(err => console.error(`whoopsies byId`, err))
    }

    const recallHistory = (id) => {
        console.log(id);
        let tempArray = historyArray;
        for (let i = 0; i < tempArray.length; i++) {
            console.log("inside for loop")
            if (tempArray[i].id === id) {
                console.log("inside if")
                setCurrent(tempArray[i]);
            }
        }
    };

    const forTesting = () => {
        // getById(12402);
        // console.log('site url: ', window.location.href)
        // console.log(`random cocktail: `, randomCocktail);
        // console.log(`cocktail byId: `, byId);
        console.log(`historyArray: `, historyArray);
        console.log(`current: `, current)
    }

    return(
        <Router>
            <Header />
            <button className="test-button" onClick={ ()=> forTesting()}>Test 2</button>
            <SearchBar 
                search = { searchByIngredient }
                getRandom = { getRandomCocktail }
            />
            <div className="main-container">
            <div className="left-area-container">
            <Route exact path="/">
                <SearchResults
                    drinksArray = { searchResult }
                    getById = { getById }
                />
            </Route>
            <Route path='/oneCocktail'>
                <Cocktail
                    drinksArray = { searchResult }
                    cocktail = { current }
                />
            </Route>
            <Route exact path="/createNew">
                <Create
                    
                />
            </Route>
            </div>
                <div className="side-container">
                    <History 
                        historyArray = { historyArray }
                        recallHistory = { recallHistory }   
                    />
                    <Favorites />
                </div>
            </div>
        </Router>
    )
};

export default App;
