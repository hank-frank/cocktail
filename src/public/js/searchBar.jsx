import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useInput } from '../../hooks/useInput.jsx';


function SearchBar (props) {
    const [searchValue, setSearchValue] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const {value, bind, reset } = useInput('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.search(value);
        reset();
        setShouldRedirect(true);
        routingForSearch();
        props.resetNoIngredient();
    }

    const routingForSearch = () => {
        if (shouldRedirect === true) {
            return(
                <Redirect to='/searchContents' />
            )
        };
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setShouldRedirect(false);
        }
        return (() => {
                isMounted = false;
            }
        )   
    }, [shouldRedirect])

    return (
        <div className="search-section">
            <div className="search-sub-section">
                    <label className="search-label">
                        Search by Ingredient:
                    </label>
                <form className="search-form" onSubmit={ handleSubmit }>
                        <input
                        className="search-bar"
                        type="text"
                        { ...bind}
                        />
                        <input className="submit-button" type="submit" value="Search" />
                </form>
                    { routingForSearch() }
            </div>
            <div className="random-flex">
                <Link to='/oneCocktail' replace>
                    <button className="random-button" onClick={ ()=> props.getRandom() }>I don't care, give me one of anything...</button>
                </Link>
                <Link to='./searchContents' replace>
                    <button className="random-button" onClick={ () => props.getTen() }>Show me any 10... </button>
                </Link>
            </div>
            <div className="no-ingredient-flex">
                {/* <h4 className="no-ingredient"> { props.noIngredient ? props.props.noIngredient : ""}</h4> */}
            </div>
            
        </div>
    )
};

export default SearchBar;
