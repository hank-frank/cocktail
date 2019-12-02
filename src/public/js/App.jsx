import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Header from './header.jsx';
import SearchBar from './searchBar.jsx';
import SearchResults from './searchResults.jsx';
import History from './history.jsx';
import Favorites from './favorites.jsx';
import Cocktail from './oneCocktail.jsx';
import Create from './createNew.jsx';
import Welcome from './welcome.jsx'

function App() {
    const [randomCocktail, setRandomCocktail] = useState({});
    const [byId, setById] = useState({});
    const [searchResult, setSearchResult] = useState([]);
    const [current, setCurrent] = useState({});
    const [historyArray, setHistoryArray] = useState([]);
    const [newArray, setNewArray] = useState([]);
    const [allViewed, setAllViewed] = useState([]);
    const [favoritesArray, setFavoritesArray] = useState([]);
    const [noIngredient, setNoIngredient] = useState("");

    useEffect(() => {
        let eachViewed = current;
        let localViewed = allViewed;
        localViewed.push(eachViewed);
        setAllViewed(localViewed);
        resetNoIngredient();
    }, [current])

    useEffect(() => {
        let localAll = allViewed;
        let localFavorites = [];

        localAll.forEach((cocktail) => {
            if (cocktail.favorite === true) {
                localFavorites.push(cocktail);
            }
        })
        setFavoritesArray(localFavorites);
    }, [allViewed])


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

    const getTen = () => {
        fetch(`/tenRandom`)
            .then((response) => {
                return response = response.json()
            })
            .then((cocktailArray) => {
                setSearchResult(cocktailArray)
                console.log(cocktailArray)
            })
            .catch(err => console.error(`whoopsies random ten: `, err))
    };

    const searchByIngredient = (searchValue) => {
        console.log(`fetch: `, searchValue)
        fetch(`byIngredient?search=${searchValue}`)
        .then((response) => {
            return response = response.json()
        })
        .then ((cocktailArray) => {
            setSearchResult(cocktailArray)
            console.log(cocktailArray)
        })
        .catch((err) => {
            console.error(`whoopsies ingredient`, err);
            setNoIngredient(`Whoopsies... No cocktails with ${searchValue}, try again.`)
        })
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
        let tempArray = historyArray;
        for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i].id === id) {
                setCurrent(tempArray[i]);
            }
        }
    };

    const addCocktail = (cocktailObject) => {
        let tempArray = newArray; 
        tempArray.push(cocktailObject);
        setNewArray(tempArray);
    }

    const makeFavorite = (cocktail) => {
        let eachViewed = current;
        let localFavorites = favoritesArray;
        localFavorites.push(eachViewed);
        setFavoritesArray(localFavorites);
    }

    const resetNoIngredient = () => {
        setNoIngredient("");
    };

    const forTesting = () => {
        // getById(12402);
        // console.log('site url: ', window.location.href);
        // console.log(`random cocktail: `, randomCocktail);
        // console.log(`cocktail byId: `, byId);
        console.log(`historyArray: `, historyArray);
        // console.log(`current: `, current);
        // console.log(`newArray: `, newArray);
        // console.log(`user input cocktails: `, newArray)
        console.log(`all viewed: `, allViewed);
        // console.log(`all favorites: `, favoritesArray);
        // console.log(`search result: `, searchResult);
    }

    return(
        <Router>
            <Header />
            {/* <div className="test-button-container">
                <button className="test-button" onClick={ ()=> forTesting()}>Testing!</button>
            </div> */}
            <SearchBar 
                search = { searchByIngredient }
                getRandom = { getRandomCocktail }
                getTen = { getTen }
                noIngredient = { noIngredient }
                resetNoIngredient = { resetNoIngredient }
            />
            <div className="main-container">
                <div className="left-area-container">
                    <Route exact path="/">
                        <Welcome />
                    </Route>
                    <Route path="/searchContents">
                        <SearchResults
                            drinksArray = { searchResult }
                            getById = { getById }
                        />
                    </Route>
                    <Route path='/oneCocktail'>
                        <Cocktail
                            drinksArray = { searchResult }
                            cocktail = { current }
                            makeFavorite = { makeFavorite }
                        />
                    </Route>
                    <Route path='/addCocktail'>
                        <Create 
                            addCocktail = { addCocktail }
                        />
                    </Route>
                </div>
                <div className="side-container">
                    <History 
                        historyArray = { historyArray }
                        recallHistory = { recallHistory }   
                    />
                    <Favorites 
                        favoritesArray = { favoritesArray }
                        recallHistory = { recallHistory }
                    />
                </div>
            </div>
        </Router>
    )
};

export default App;
