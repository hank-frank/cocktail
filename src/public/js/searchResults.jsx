import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SearchResult (props) {

    const shouldDisplay = () => {
        if (props.drinksArray.length > 0) {
            return (
                <>
                    <div className="card-flex">
                    {
                        props.drinksArray.map((each) => {
                            return (
                                <Link to='/oneCocktail' key={ each.idDrink }>
                                    <div className="cocktail-card" key={ each.idDrink } onClick={ () => props.getById(each.idDrink) }>
                                        <div className="card-contents">
                                            <h1 className="cocktail-card-title">{ each.strDrink }</h1>
                                            <img className="card-image" src={ each.strDrinkThumb } />
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                    </div>
                </>
            ) 
        } else {
            return (
                <div className="havent-searched-flex">
                    <h6 className="havent-searched">You haven't searched for anything yet, search for some stuff brosefina!</h6>
                </div>
            )   
        }
    };

    return (
        <>
            { shouldDisplay() }
        </>
    )
};

export default SearchResult;
