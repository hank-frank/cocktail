import React, { useState, useEffect } from 'react';
import { Link, Redirect} from 'react-router-dom';

function SearchResult (props) {

    const shouldDisplay = () => {
        if (props.props.drinksArray.length > 0) {
            return (
                <>
                    <div className="card-flex">
                    {
                        props.props.drinksArray.map((each) => {
                            return (
                                <Link to='/oneCocktail' key={ each.idDrink } >
                                    <div className="cocktail-card" key={ each.idDrink } onClick={ () => props.props.getById(each.idDrink, each.source) }>
                                        <div className="card-contents">
                                            <h1 className="cocktail-card-title">{ each.strDrink }</h1>
                                            { each.strDrinkThumb == "noImage" ? <div className="pint" /> : <img className="card-image" src={ each.strDrinkThumb } />}
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
                // <Redirect to='/search' />
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
