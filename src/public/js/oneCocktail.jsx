import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Cocktail (props) {
    const [toggleState, setToggleState] = useState(false);
    const [backToSearch, setBackToSearch] = useState(false);

    useEffect(() => {
        setToggleState(false);
    },[props])

    const checkToggle = () => {
        setToggleState(!toggleState);
        let tempCocktail = props.cocktail;
        tempCocktail.favorite = toggleState;
        props.makeFavorite(tempCocktail);
    };

    const handleBackClick = () => {
        console.log("getting clicked1", backToSearch)
        setBackToSearch(true);
    }

    const routeToSearch = () => {
        if (backToSearch === true) {
            return (
            <Redirect to='/searchContents' />
            )
        }
    };

    useEffect(() => {
        setBackToSearch(false);
    }, [backToSearch])
    
    return (
        <>
            <div className="one-cocktail-container">
                <div className="back-container" onClick={ () => handleBackClick() }>
                    { routeToSearch() }
                </div>
                <div className="cocktail-content">                 
                    <div className="first-row">
                        
                        <div className="title-ingredients">
                            <h4 className="cocktail-title">{ props.cocktail.name ? props.cocktail.name : "Name coming Soon!" }</h4>
                            <h6 className="favorite">Favorite:</h6>
                            <label className="toggle-switch">
                                <input type="checkbox" onChange={() => checkToggle()} checked={ toggleState }/>
                                <span className="slider round"></span>
                            </label>
                            <div className="title-box">
                                    <h4 className="ingredient-title">Type of Glass: </h4>
                            </div>
                            <div className="horizontal-glass">
                                <p className="glass-type">{ props.cocktail.glass ? props.cocktail.glass : "glass"}</p>
                                <div className="pint" />
                            </div>
                            <div className="ingredient-container">
                                <div className="title-box">
                                    <h4 className="ingredient-title">Ingredients</h4>
                                </div>
                                <div className="ingredients-both">
                                    {props.cocktail.both ?
                                        props.cocktail.both.map((ingredient, key) => {
                                            key++
                                            return (
                                            <p className="ingredient" key={key}>{} { ingredient }</p>
                                            )
                                        }) : <p className="ingredient">ingredients</p>
                                    }
                                </div>
                                <div>
                            </div>
                            </div>
                        </div>
                        <div className="image-holder-col">
                            <div className="image-holder-row">
                                <img className="temp-image" src={ props.cocktail.image }/>
                            </div>
                        </div>
                    </div>
                    <div className="second-row">
                        <div className="instructions-container">
                            <div className="title-box">
                                <h4 className="ingredient-title">Description</h4>
                            </div>
                            <p className="description">{ props.cocktail.instructions ? props.cocktail.instructions : "description"}</p> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Cocktail;