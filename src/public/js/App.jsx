import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import Main from './Main.jsx';
import Header from './header.jsx';
import withAuth from './routeProtect.jsx';
import Welcome from './welcome.jsx'
import Register from './register.jsx';
import Login from './login.jsx';

import SearchBar from './searchBar.jsx';
import SearchResults from './searchResults.jsx';
import History from './history.jsx';
import Favorites from './favorites.jsx';
import Cocktail from './oneCocktail.jsx';
import Create from './createNew.jsx';


function App() {
    // const [randomCocktail, setRandomCocktail] = useState({});
    // const [byId, setById] = useState({});
    // const [searchResult, setSearchResult] = useState([]);
    // const [current, setCurrent] = useState({});
    // const [historyArray, setHistoryArray] = useState([]);
    // const [newArray, setNewArray] = useState([]);
    // const [allViewed, setAllViewed] = useState([]);
    // const [favoritesArray, setFavoritesArray] = useState([]);
    // const [noIngredient, setNoIngredient] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const registerUser = async (userName, password) => {
        let userObject = {
            userName: userName,
            password: password
        }

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
            
            
        } else if(loggedInUser.message == "no user") {

        } else {
            setLoginMessage('username or password not correct');
        }
    };

    return(
        <Router>
            <Header />
            
            {/* <div className="main-container">
                <div className="left-area-container"> */}
                    <Route exact path="/">
                        <Welcome />
                    </Route>
                    <Route path="/register">
                        <Register
                            registerUser = { registerUser }
                        />
                    </Route>
                    <Route path="/login">
                        <Login
                            login = { login }
                            loginMessage = { loginMessage }
                        />
                    </Route>
                    {/* <Route path="/main">
                        <Main />
                    </Route> */}
                    <Route path='/main' component={ withAuth(Main) } />
                {/* </div>
            </div> */}
        </Router>
    )
};

export default App;
