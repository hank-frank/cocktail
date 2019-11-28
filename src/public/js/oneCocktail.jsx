import React, { useState, useEffect } from 'react';

function Cocktail (props) {
    const [search, setSearch] = useState("");

    
    return (
        <>
            <div className="one-cocktail-container">
                <div className="cocktail-content">                 
                    <div className="first-row">
                        <div className="title-ingredients">
                            <h4 className="cocktail-title">{ props.cocktail.name ? props.cocktail.name : "Name coming Soon!" }</h4>
                            <div className="ingredient-container">
                                <div className="title-box">
                                    <h4 className="ingredient-title">Ingredients</h4>
                                </div>
                                <div className="ingredients-units">
                                    {props.cocktail.units ?
                                        props.cocktail.units.map((unit) => {
                                            return (
                                            <p className="ingredient">{} { unit }</p>
                                            )
                                        }) : <p className="ingredient">unit</p>
                                    }
                                    {props.cocktail.ingredients ?
                                        props.cocktail.ingredients.map((ingredient) => {
                                            return (
                                            <p className="ingredient">{} { ingredient }</p>
                                            )
                                        }) : <p className="ingredient">Ingredients</p>
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