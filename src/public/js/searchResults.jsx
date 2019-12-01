import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SearchResult (props) {

    // useEffect(() => {
    //     console.log(`props: `, props)
    // }, [props])

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
};

export default SearchResult;
