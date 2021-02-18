import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

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
import withAuth from './routeProtect.jsx'; 

function App() {
    const [searchResult, setSearchResult] = useState([]);
    const [current, setCurrent] = useState({});
    const [historyArray, setHistoryArray] = useState([]);
    const [histLen, setHistLen] = useState(0);
    const [allViewed, setAllViewed] = useState([]);
    const [favoritesArray, setFavoritesArray] = useState([]);
    const [favLen, setFavLen] = useState(0);
    const [noIngredient, setNoIngredient] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [showSideContainer, setShowSideContainer] = useState(false)
    const [shouldRedirectAfterLogin, setShouldRedirectAfterLogin] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            let eachViewed = current;
            let localViewed = allViewed;
            localViewed.push(eachViewed);
            setAllViewed(localViewed);
            resetNoIngredient();
        }
        return (() => {
                isMounted = false;
            }
        ) 
        
    }, [current])

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {          
            let localAll = allViewed;
            let localFavorites = [];
    
            localAll.forEach((cocktail) => {
                if (cocktail.favorite === true) {
                    localFavorites.push(cocktail);
                }
            })
            setFavoritesArray(localFavorites);
            setFavLen(localFavorites.length);
        }
        return (() => {
                isMounted = false;
            }
        ) 
    }, [allViewed])

    useEffect(() => {    
        // const isValid = checkUseToken();
    })

    // const checkUseToken = async () => {
    //     const rawUserWithToken = await fetch('./checkToken');
    //     if (rawUserWithToken.status === 200) {
    //         // setIsLoggedIn(true);
    //         setShowSideContainer(true);
    //     }  else {
    //         setIsLoggedIn(false);
    //         setShowSideContainer(false);
    //     }
        
    // }

    const resetSideContainerView = () => {
        setShowSideContainer(false);
    }

    const getRandomCocktail = () => {
        fetch(`/randomCocktail`)
            .then((response) => {
                return response = response.json()
            })
            .then((cocktail) => {
                setCurrent(cocktail);
                let tempHistory = historyArray;
                tempHistory.push(cocktail);
                tempHistory = removeDuplicates(tempHistory, 'id');
                setHistoryArray(tempHistory);
                setHistLen(tempHistory.length);
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
    }

    const getById = (cocktailId, source) => {
        fetch(`byId?id=${cocktailId}&source=${source}`)
        .then((response) => {
            return response = response.json()
        })
        .then ((cocktail) => {
            // setById(cocktail);
            setCurrent(cocktail);
            let tempHistory = historyArray;
            tempHistory.push(cocktail);
            let noDupesHist = removeDuplicates(tempHistory, 'id');
            setHistoryArray(tempHistory);
            setHistLen(tempHistory.length);
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
    }

    const removeDuplicates = (myArr, prop) => {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }

    const makeFavorite = (cocktail) => {
        let eachViewed = current;
        let localFavorites = favoritesArray;
        localFavorites.push(eachViewed);
        let noDupesFavs = removeDuplicates(localFavorites, 'id');
        setFavoritesArray(noDupesFavs);
        setFavLen(noDupesFavs.length);
    }

    const removeFavorite = (cocktail) => {
        let localFavorites = favoritesArray;
        for (let i = 0; i < localFavorites.length; i++) {
            if (favoritesArray[i].id === cocktail.id) {
                favoritesArray.splice(i, 1);
            }
        }
        setFavoritesArray(localFavorites);
        setFavLen(localFavorites.length);
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
        let loggedInUser = await rawResponse.json();

        if (loggedInUser.user == userName) {
            setIsLoggedIn(true);     
            setShouldRedirectAfterLogin(true);  
            setShowSideContainer(true);
        } else if (loggedInUser.message == "no user") {
            setLoginMessage('username or password not correct');
        } else {
            setLoginMessage('username or password not correct');
        }
    };

    const resetShouldRedirect = () => {
        shouldRedirectAfterLogin ? setShouldRedirectAfterLogin(false) : null;
    }

    const logout = async () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setIsLoggedIn(false);
        setShowSideContainer(false);
        setHistoryArray([]);
        setHistLen(0);
        setFavoritesArray([]);
        setFavLen(0);

    }

    const logoutRedirect = () => {
        if (!isLoggedIn) {
            return <Redirect to='/login' />
        }
    }

    const testFunct = () => {
        //can be used for tests
    }

    const adjustWidth = () => {
        return isLoggedIn ? "" : 'left-area-full';
    }

    return(
        <Router>
            <Header 
                isLoggedIn = { isLoggedIn }
                logout = { logout }
                testFunct = {testFunct}
            />
            {
                showSideContainer ?
                <SearchBar 
                    search = { searchByIngredient }
                    getRandom = {getRandomCocktail}
                    getTen = {getTen}
                    noIngredient = {noIngredient}
                    resetNoIngredient = {resetNoIngredient}
                />
                : null
            }
        {/* <button className="test-button" onClick={ testFunct }>Reset COokie</button> */}
        { logoutRedirect() }
            <div className={`main-container ${adjustWidth()}`}>
                <div className={`left-area-container ${adjustWidth()}`}>
                    <Route exact path="/">
                        <Welcome />
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
                            shouldRedirectAfterLogin = { shouldRedirectAfterLogin }
                            resetShouldRedirect = { resetShouldRedirect }
                            resetSideContainerView = { resetSideContainerView }
                        />
                    </Route>
                    {/* <Route path="/search" component={ withAuth(SearchBar, {
                        search: searchByIngredient,
                        getRandom: getRandomCocktail,
                        getTen: getTen,
                        noIngredient: noIngredient,
                        resetNoIngredient: resetNoIngredient
                    })}>
                    </Route> */}
                    <Route path="/searchContents" component={ withAuth(SearchResults, {
                        drinksArray: searchResult,
                        getById: getById
                    })}>
                    </Route>
                    <Route path='/oneCocktail' component={ withAuth(Cocktail, {
                        drinksArray: searchResult,
                        cocktail: current,
                        makeFavorite: makeFavorite,
                        removeFavorite: removeFavorite,
                        getOne: getOne,
                        favoritesArray: favoritesArray
                    })}></Route>
                    <Route path='/addCocktail' component={ withAuth(Create, {
                        addCocktail: addCocktail
                    })}></Route>
                </div>
                {
                    showSideContainer ?
                    <div className="side-container" >
                        <History 
                            historyArray = { historyArray }
                            historyLen = { histLen }
                            recallHistory = { recallHistory }

                        />
                        <Favorites 
                            favoritesArray = { favoritesArray }
                            favoritesLen = { favLen }
                            recallHistory = { recallHistory }
                        />
                    </div>
                    : null
                }
            </div>
        </Router>
    )
};

export default App;
