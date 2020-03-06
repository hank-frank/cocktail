import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favorites (props) {
    const [favoritesList, setFavoritesList] = useState("");

    useEffect(() => {

        let favs =  updateFavorites(props);
        setFavoritesList(favs);
    }, [props])

    const updateFavorites = (props) => {
        return(
            props.favoritesArray.map((cocktail, key) => {
                    return  (
                        <Link to='/oneCocktail' key={ cocktail.id } replace>
                            <p className="history-cocktail-title" onClick={() => props.recallHistory(cocktail.id)}>{ cocktail.name }</p>
                        </Link>
                    )
                })
        )
    };


    return (
        <>
            <div className="fav-title-box">
                <h4 className="fav-title">Favorites</h4>
            </div>
            { favoritesList }
        </>
    )
};

export default Favorites;