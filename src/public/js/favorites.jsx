import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favorites (props) {
    const [favorites, setFavorites] = useState([]);

    useEffect(()=> {
        let isMounted = true;
        if (isMounted) {
            let tempFavorites = props.favoritesArray;
            setFavorites(tempFavorites);
        }
        return (() => {
                isMounted = false;
            }
    )   
    }, [props.favoritesLen]);

    const updateFavorites = () => {
        return(
            favorites.map((cocktail, key) => {
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
            { updateFavorites() }
        </>
    )
};

export default Favorites;