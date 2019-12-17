import React, { useState, useEffect } from 'react';

import { useInput } from '../../hooks/useInput.jsx';

function Create (props) {
    const { value:name, bind:bindname, reset:resetname } = useInput('');
    const { value:glass, bind:bindglass, reset:resetglass } = useInput('');
    const { value:category, bind:bindcategory, reset:resetcategory } = useInput('');
    const { value:instructions, bind:bindinstructions, reset:resetinstructions } = useInput('');
    const { value:ingredient1, bind:bindingredient1, reset:resetingredient1 } = useInput('');
    const { value:ingredient2, bind:bindingredient2, reset:resetingredient2 } = useInput('');
    const { value:ingredient3, bind:bindingredient3, reset:resetingredient3 } = useInput('');
    const { value:ingredient4, bind:bindingredient4, reset:resetingredient4 } = useInput('');
    const { value:ingredient5, bind:bindingredient5, reset:resetingredient5 } = useInput('');
    const { value:ingredient6, bind:bindingredient6, reset:resetingredient6 } = useInput('');
    const { value:ingredient7, bind:bindingredient7, reset:resetingredient7 } = useInput('');
    const { value:ingredient8, bind:bindingredient8, reset:resetingredient8 } = useInput('');
    const { value:ingredient9, bind:bindingredient9, reset:resetingredient9 } = useInput('');
    const { value:ingredient10, bind:bindingredient10, reset:resetingredient10 } = useInput('');
    const { value:ingredient11, bind:bindingredient11, reset:resetingredient11 } = useInput('');
    const { value:ingredient12, bind:bindingredient12, reset:resetingredient12 } = useInput('');
    const { value:ingredient13, bind:bindingredient13, reset:resetingredient13 } = useInput('');
    const { value:ingredient14, bind:bindingredient14, reset:resetingredient14 } = useInput('');
    const { value:ingredient15, bind:bindingredient15, reset:resetingredient15 } = useInput('');
    const { value:unit1, bind:bindunit1, reset:resetunit1 } = useInput('');
    const { value:unit2, bind:bindunit2, reset:resetunit2 } = useInput('');
    const { value:unit3, bind:bindunit3, reset:resetunit3 } = useInput('');
    const { value:unit4, bind:bindunit4, reset:resetunit4 } = useInput('');
    const { value:unit5, bind:bindunit5, reset:resetunit5 } = useInput('');
    const { value:unit6, bind:bindunit6, reset:resetunit6 } = useInput('');
    const { value:unit7, bind:bindunit7, reset:resetunit7 } = useInput('');
    const { value:unit8, bind:bindunit8, reset:resetunit8 } = useInput('');
    const { value:unit9, bind:bindunit9, reset:resetunit9 } = useInput('');
    const { value:unit10, bind:bindunit10, reset:resetunit10 } = useInput('');
    const { value:unit11, bind:bindunit11, reset:resetunit11 } = useInput('');
    const { value:unit12, bind:bindunit12, reset:resetunit12 } = useInput('');
    const { value:unit13, bind:bindunit13, reset:resetunit13 } = useInput('');
    const { value:unit14, bind:bindunit14, reset:resetunit14 } = useInput('');
    const { value:unit15, bind:bindunit15, reset:resetunit15 } = useInput('');
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        // console.log(`Capturing locally: ${name} ${glass} ${category} ${instructions} ${ingredient1} ${unit2}`);
        let id = 0
        let units = [
            unit1,
            unit2,
            unit3,
            unit4,
            unit5,
            unit6,
            unit7,
            unit8,
            unit9,
            unit10,
            unit11,
            unit12,
            unit13,
            unit14,
            unit15
        ]
        let ingredients = [
            ingredient1,
            ingredient2,
            ingredient3,
            ingredient4,
            ingredient5,
            ingredient6,
            ingredient7,
            ingredient8,
            ingredient9,
            ingredient10,
            ingredient11,
            ingredient12,
            ingredient13,
            ingredient14,
            ingredient15
        ]
        let both = [
            `${unit1} ${ingredient1}`,
            `${unit2} ${ingredient2}`,
            `${unit3} ${ingredient3}`,
            `${unit4} ${ingredient4}`,
            `${unit5} ${ingredient5}`,
            `${unit6} ${ingredient6}`,
            `${unit7} ${ingredient7}`,
            `${unit8} ${ingredient8}`,
            `${unit9} ${ingredient9}`,
            `${unit10} ${ingredient10}`,
            `${unit11} ${ingredient11}`,
            `${unit12} ${ingredient12}`,
            `${unit13} ${ingredient13}`,
            `${unit14} ${ingredient14}`,
            `${unit15} ${ingredient15}`,
        ]
        let newCocktail = {
            "id": id,
            "name": name,
            "category": category,
            "glass": glass,
            "instructions": instructions,
            "ingredients": ingredients.filter((each) => {
                return each != ''
            }),
            "units": units.filter((each) => {
                return each != ''
            }),
            "both": both.filter((each) => {
                return each != ' '
            }),
            "source": "local",
            "favorite": "false"
        }
        id++

        props.addCocktail(newCocktail);
        console.log(`cocktail from all component: `, newCocktail)

        resetname();
        resetglass();
        resetcategory();
        resetinstructions();
        resetingredient1();
        resetingredient2();
        resetingredient3();
        resetingredient4();
        resetingredient5();
        resetingredient6();
        resetingredient7();
        resetingredient8();
        resetingredient9();
        resetingredient10();
        resetingredient11();
        resetingredient12();
        resetingredient13();
        resetingredient14();
        resetingredient15();
        resetunit1();
        resetunit2();
        resetunit3();
        resetunit4();
        resetunit5();
        resetunit6();
        resetunit7();
        resetunit8();
        resetunit9();
        resetunit10();
        resetunit11();
        resetunit12();
        resetunit13();
        resetunit14();
        resetunit15();
    };
    
    return (
        <>
            <div className="create-container">
                <div className="create-title-flex">
                    <h4 className="create-title">Input your own cocktail!</h4>
                </div>
                <div className="inputs-hor-flex">
                    <form className="inputs-vert-flex" onSubmit={handleSubmit}>
                        <div className="label-input-group">
                            <label>
                                Name:
                                <input type="text" className="cocktail-input" {...bindname} />
                            </label>
                        </div>
                        <div className="label-input-group">
                            <label>
                                Glass:
                                <input type="text" className="cocktail-input" {...bindglass} />
                            </label>
                        </div>
                        <div className="label-input-group">
                            <label>
                                Category:
                                <input type="text" className="cocktail-input" {...bindcategory} />
                            </label>
                        </div>
                        <div className="label-input-group">
                            <label>
                                Instructions:
                                <input type="text" className="cocktail-input" {...bindinstructions} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 1:
                                <input type="text" className="cocktail-input" {...bindunit1} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 1:
                                <input type="text" className="cocktail-input" {...bindingredient1} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 2:
                                <input type="text" className="cocktail-input" {...bindunit2} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 2:
                                <input type="text" className="cocktail-input" {...bindingredient2} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 3:
                                <input type="text" className="cocktail-input" {...bindunit3} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 3:
                                <input type="text" className="cocktail-input" {...bindingredient3} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 4:
                                <input type="text" className="cocktail-input" {...bindunit4} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 4:
                                <input type="text" className="cocktail-input" {...bindingredient4} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 5:
                                <input type="text" className="cocktail-input" {...bindunit5} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 5:
                                <input type="text" className="cocktail-input" {...bindingredient5} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 6:
                                <input type="text" className="cocktail-input" {...bindunit6} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 6:
                                <input type="text" className="cocktail-input" {...bindingredient6} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 7:
                                <input type="text" className="cocktail-input" {...bindunit7} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 7:
                                <input type="text" className="cocktail-input" {...bindingredient7} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 8:
                                <input type="text" className="cocktail-input" {...bindunit8} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 8:
                                <input type="text" className="cocktail-input" {...bindingredient8} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 9:
                                <input type="text" className="cocktail-input" {...bindunit9} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 9:
                                <input type="text" className="cocktail-input" {...bindingredient9} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 10:
                                <input type="text" className="cocktail-input" {...bindunit10} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 10:
                                <input type="text" className="cocktail-input" {...bindingredient10} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 11:
                                <input type="text" className="cocktail-input" {...bindunit11} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 11:
                                <input type="text" className="cocktail-input" {...bindingredient11} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 12:
                                <input type="text" className="cocktail-input" {...bindunit12} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 12:
                                <input type="text" className="cocktail-input" {...bindingredient12} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 13:
                                <input type="text" className="cocktail-input" {...bindunit13} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 13:
                                <input type="text" className="cocktail-input" {...bindingredient13} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 14:
                                <input type="text" className="cocktail-input" {...bindunit14} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 14:
                                <input type="text" className="cocktail-input" {...bindingredient14} />
                            </label>
                        </div>
                        <div className="ingredient-input-group">
                            <br/>
                            <label>
                                Unit 15:
                                <input type="text" className="cocktail-input" {...bindunit15} />
                            </label>
                            <br/>
                            <label>
                                Ingredient 15:
                                <input type="text" className="cocktail-input" {...bindingredient15} />
                            </label>
                        </div>
                        <input type="submit" value="Submit" className="inputs-submit"/>
                    </form>
                </div>
            </div>
        </>
    )
};

export default Create;