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
import Register from './register.jsx';
import Login from './login.jsx';

function App() {
    // const [byId, setById] = useState({});
    const [searchResult, setSearchResult] = useState([]);
    const [current, setCurrent] = useState({});
    const [historyArray, setHistoryArray] = useState([]);
    // const [newArray, setNewArray] = useState([]);
    const [allViewed, setAllViewed] = useState([]);
    const [favoritesArray, setFavoritesArray] = useState([]);
    const [noIngredient, setNoIngredient] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');

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
                setSearchResult(cocktailArray);
            })
            .catch(err => console.error(`whoopsies random ten: `, err));
            console.log(`get Ten results: `, searchResult);
    };

    const searchByIngredient = (searchValue) => {
        fetch(`byIngredient?search=${searchValue}`)
        .then((response) => {
            return response = response.json()
        })
        .then ((cocktailArray) => {
            setSearchResult(cocktailArray);
        })
        .catch((err) => {
            console.error(`whoopsies ingredient`, err);
            setNoIngredient(`Whoopsies... No cocktails with ${searchValue}, try again.`)
        });
        console.log(`ingredient search results, `, searchResult);
    }

    const getById = (cocktailId, source) => {
        fetch(`byId?id=${cocktailId}&source=${source}`)
        .then((response) => {
            return response = response.json()
        })
        .then ((cocktail) => {
            console.log(`cocktail by id: `, cocktail);
            // setById(cocktail);
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

    const addCocktail = async (cocktailObject) => {
        const rawResponse = await fetch('createNew', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cocktailObject)
        });
        const addedCocktail = await rawResponse.json();
        console.log(`added cocktail: `, addedCocktail);
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

    const getOne = (cocktail) => {
        setCurrent(cocktail);
    };

    const registerUser = async (userName, password, password2) => {
        let userObject = {
            userName: userName,
            password: password
        };

        if (password === password2) {

            const rawResponse = await fetch('register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            });
            const addedUser = await rawResponse.json();
            console.log(`username response: `, addedUser);
            if (addedUser.message == 'already-exists') {
                setRegisterMessage("User name already exists, pick a new one")
            }
        } else {
            setRegisterMessage("Your passwords don't match playboy, try again")
        }
    };

    const login = async (userName, password) => {
        let userObject = {
            userName: userName,
            password: password
        };
        const rawResponse = await fetch('userLogin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
        });
        const loggedInUser = await rawResponse.json();
        console.log(`username response: `, loggedInUser);

        if (loggedInUser.user == userName) {
            //
            
        } else if(loggedInUser.message == "no user") {

        } else {
            setLoginMessage('username or password not correct');
        }
    };

    return(
        <Router>
            <Header />

            <div className="main-container">
                <div className="left-area-container">
                    <Route exact path="/">
                        <Welcome />
                    </Route>
                    <Route path="/search">
                    <SearchBar 
                        search = { searchByIngredient }
                        getRandom = { getRandomCocktail }
                        getTen = { getTen }
                        noIngredient = { noIngredient }
                        resetNoIngredient = { resetNoIngredient }
                    />
                    </Route>
                    <Route path="/searchContents">
                        <SearchResults
                            drinksArray = { searchResult }
                            getById = { getById }
                        />
                    </Route>
                    <Route path="/register">
                        <Register
                            registerUser = { registerUser }
                            registerMessage = { registerMessage }
                        />
                    </Route>
                    <Route path="/login">
                        <Login
                            login = { login }
                            loginMessage = { loginMessage }
                        />
                    </Route>
                    <Route path='/oneCocktail'>
                        <Cocktail
                            drinksArray = { searchResult }
                            cocktail = { current }
                            makeFavorite = { makeFavorite }
                            getOne={ getOne }
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
