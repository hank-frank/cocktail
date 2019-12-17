import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useInput } from '../../hooks/useInput.jsx';


function SearchBar (props) {
    const [searchValue, setSearchValue] = useState("");
    const [conditionalLink, setConditionalLink] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const {value, bind, reset } = useInput('');

    // useEffect(() => {
    //     if (window.location.href === 'http://localhost:8000/#/oneCocktail') {
    //         setConditionalLink(
    //             <>
    //                 <button className="random-button" onClick={ ()=> props.getRandom() }>I don't care, give me anything...</button>
    //                 <button className="random-button" onClick={ () => props.getTen() }>Show me any 10... </button>
    //             </>
    //         )
    //     } else {
    //         setConditionalLink(
    //             <Link to='/oneCocktail'>
    //                 <button className="random-button" onClick={ ()=> props.getRandom() }>I don't care, give me one of anything...</button>
    //                 <button className="random-button" onClick={ () => props.getTen() }>Show me any 10... </button>
    //             </Link>
    //         )
    //     }
    // }, [window.location.href]);

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
        setShouldRedirect(false);
    }, [shouldRedirect])

    return (
        <>
        {/* <div className="horizontal-center">
            <div className="cocktail-bubble">
                <div className="vertical-center">
                    <div className="glass-image" />
                </div>
            </div>
            <div className="cocktail-bubble">
                <div className="vertical-center">
                    <div className="glass-image" />
                </div>
            </div>
            <div className="cocktail-bubble">
                <div className="vertical-center">
                    <div className="glass-image" />
                </div>
            </div>
            <div className="cocktail-bubble">
                <div className="vertical-center">
                    <div className="glass-image" />
                </div>
            </div>
            <div className="cocktail-bubble">
                <div className="vertical-center">
                    <div className="glass-image" />
                </div>
            </div>
            <div className="cocktail-bubble">
                <div className="vertical-center">
                    <div className="glass-image" />
                </div>
            </div>
            <div className="cocktail-bubble">
                <div className="vertical-center">
                    <div className="glass-image" />
                </div>
            </div>
            <div className="cocktail-bubble">
                <div className="vertical-center">
                    <div className="glass-image" />
                </div>
            </div>
            <div className="cocktail-bubble">
                <div className="vertical-center">
                    <div className="glass-image" />
                </div>
            </div>
        </div> */}
        <div className="search-section">
            <form onSubmit={ handleSubmit }>
                <label className="search-label">
                    Search by Ingredient:
                    <input
                    className="search-bar"
                    type="text"
                    { ...bind}
                    />
                </label>
                    <input className="submit-button" type="submit" value="Search" />
            </form>
                { routingForSearch() }
        </div>
        <div className="random-flex">
            {/* { conditionalLink } */}
            <Link to='/oneCocktail'>
                <button className="random-button" onClick={ ()=> props.getRandom() }>I don't care, give me one of anything...</button>
            </Link>
            <Link to='./searchContents'>
                <button className="random-button" onClick={ () => props.getTen() }>Show me any 10... </button>
            </Link>
        </div>
        <div className="no-ingredient-flex">
            <h4 className="no-ingredient"> { props.noIngredient }</h4>
        </div>
        </>
    )
};

export default SearchBar;
