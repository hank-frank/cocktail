import React, { useState, useEffect } from 'react';

function Cocktail (props) {
    const [toggleState, setToggleState] = useState(false);

    let checkToggle = () => {
        setToggleState(!toggleState);
        console.log(toggleState);
        let tempCocktail = props.cocktail;
        tempCocktail.favorite = toggleState;
        console.log(tempCocktail);
        props.makeFavorite(tempCocktail);
    };
    
    return (
        <>
            <div className="one-cocktail-container">
                <div className="cocktail-content">                 
                    <div className="first-row">
                        <div>
                            <div className="title-box">
                                <h4 className="ingredient-title">Type of Glass: </h4>
                            </div>
                            <p className="glass-type">{ props.cocktail.glass ? props.cocktail.glass : "glass"}</p>
                        </div>
                        <div className="title-ingredients">
                            <h4 className="cocktail-title">{ props.cocktail.name ? props.cocktail.name : "Name coming Soon!" }</h4>
                            <h6 className="favorite">Favorite:</h6>
                            <label className="toggle-switch">
                                <input type="checkbox" onChange={() => checkToggle()} checked={toggleState}/>
                                <span className="slider round"></span>
                            </label>
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