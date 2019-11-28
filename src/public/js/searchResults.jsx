import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SearchResult (props) {
    // const [search, setSearch] = useState("")
    return (
        <>
            <div className="card-flex">
            {
                props.drinksArray.map((each) => {
                    return (
                        <div className="cocktail-card" key={ each.idDrink } onClick={ props.getById(each.idDrink) }>
                            {/* <Link to='/oneCocktail'> */}
                                <div className="card-contents">
                                    <h1 className="cocktail-card-title">{ each.strDrink }</h1>
                                    <img className="card-image" src={ each.strDrinkThumb } />
                                </div>
                            {/* </Link> */}
                        </div>
                    )
                })
            }
            </div>
        </>
    )
};

export default SearchResult;