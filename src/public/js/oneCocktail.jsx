import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Cocktail (props) {
    const [toggleState, setToggleState] = useState(false);
    const [backToSearch, setBackToSearch] = useState(false);

    useEffect(() => {
        setToggleState(false);
        console.log(`props: `, props.props.cocktail);
    },[props])

    const checkToggle = () => {
        setToggleState(!toggleState);
        let tempCocktail = props.props.cocktail;
        tempCocktail.favorite = toggleState;
        props.props.makeFavorite(tempCocktail);
        console.log(`make fav in fav`)
    };

    const handleBackClick = () => {
        setBackToSearch(true);
    }

    const routeToSearch = () => {
        if (backToSearch === true) {
            return (
            <Redirect to='/searchContents' />
            )
        }
    };

    const sendItOnBack = () => {
        let {id, name, category, glass, instructions, deutschInstructions, image, ingredients, units, both, source } = props.props.cocktail;
        fetch(`/dbTest?id=${id}&name=${name}&glass=${glass}&instructions=${instructions}&both=${both}&source=${source}&category=${category}&imageUrl=${image}`)
            .then((response) => {
                return response = response.json()
            })
            .catch(err => console.error(`whoopsies sendItBack`, err))
    }

    const getOne = () => {
        fetch(`/getOne`)
            .then((response) => {
                return response = response.json()
            }).then ((res) => {
                props.props.getOne(res);
            })
            .catch(err => console.error(`whoopsies getOne`, err))
    }

    useEffect(() => {
        setBackToSearch(false);
    }, [backToSearch]);

    const glassicon = (glassType) => {
        switch (glassType.toLowerCase()) {
            case "highball glass":
                return <div className="middle-glass" />
                break;
            case "cocktail glass":
                return <div className="coup" />
                break;
            case "martini":
            case "martini glass":
                return <div className="martini" />
                break;
            case "shot":
            case "shot glass":
                return <div className="shot" />
                break;
            case "wine":
            case "champagne flute":
            case "wine glass":
                return <div className="wine" />
                break;
            case "beer":
            case "pint":
            case "pint glass":
            case "beer mug":
                return <div className="pint" />
                break;
            case "whiskey sour glass":
            case "old-fashioned glass":
                return <div className="short" />
                break;
            default:
                return <div className="straight" />
        }
    }
    
    return (
        <>
        {/* <button className="test-button" onClick={ getOne } >Get one cocktail from DB</button>  */}
        <div className="one-cocktail-container">
            <div className="back-container" onClick={ () => handleBackClick() }>
                { routeToSearch() }
            </div>
            <div className="cocktail-content">                 
                <div className="first-row">
                    <div className="title-ingredients">
                        <h4 className="cocktail-title">{ props.props.cocktail.name ? props.props.cocktail.name : "Name coming Soon!" }</h4>
                        <h6 className="favorite">Favorite:</h6>
                        <label className="toggle-switch">
                            <input type="checkbox" onChange={() => checkToggle()} checked={ toggleState }/>
                            <span className="slider round"></span>
                        </label>
                        <div className="title-box">
                                <h4 className="ingredient-title">Type of Glass: </h4>
                        </div>
                        <div className="horizontal-glass">
                            <p className="glass-type">{ props.props.cocktail.glass ? props.props.cocktail.glass : "glass"}</p>
                            { props.props.cocktail.glass ? glassicon(props.props.cocktail.glass) : ""}
                        </div>
                        <div className="ingredient-container">
                            <div className="title-box">
                                <h4 className="ingredient-title">Ingredients</h4>
                            </div>
                            <div className="ingredients-both">
                                {props.props.cocktail.both ?
                                    props.props.cocktail.both.map((ingredient, key) => {
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
                            { props.props.cocktail.image == "noImage" || props.props.cocktail.image == "" ? <div className="noImage">No Image Avaialble</div> : <img className="temp-image" src={ props.props.cocktail.image }/>}
                        </div>
                    </div>
                </div>
                <div className="second-row">
                    <div className="instructions-container">
                        <div className="title-box">
                            <h4 className="ingredient-title">Description</h4>
                        </div>
                        <p className="description">{ props.props.cocktail.instructions ? props.props.cocktail.instructions : "description"}</p> 
                    </div>
                </div>
            </div>
            </div>
            <button className="test-button" onClick={ sendItOnBack } >Test button, sends cocktail to backend</button>            
        </>
    )
};

export default Cocktail;
