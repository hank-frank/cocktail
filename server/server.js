const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('dist'));
app.use(express.static('src'));

app.get('/randomCocktail', (req, res) => {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then((result) => {
            let ingredients = [
                result.data.drinks[0].strIngredient1,
                result.data.drinks[0].strIngredient2,
                result.data.drinks[0].strIngredient3,
                result.data.drinks[0].strIngredient4,
                result.data.drinks[0].strIngredient5,
                result.data.drinks[0].strIngredient6,
                result.data.drinks[0].strIngredient7,
                result.data.drinks[0].strIngredient8,
                result.data.drinks[0].strIngredient9,
                result.data.drinks[0].strIngredient10,
                result.data.drinks[0].strIngredient11,
                result.data.drinks[0].strIngredient12,
                result.data.drinks[0].strIngredient13,
                result.data.drinks[0].strIngredient14,
                result.data.drinks[0].strIngredient15,
            ];
            let units = [
                result.data.drinks[0].strMeasure1,
                result.data.drinks[0].strMeasure2,
                result.data.drinks[0].strMeasure3,
                result.data.drinks[0].strMeasure4,
                result.data.drinks[0].strMeasure5,
                result.data.drinks[0].strMeasure6,
                result.data.drinks[0].strMeasure7,
                result.data.drinks[0].strMeasure8,
                result.data.drinks[0].strMeasure9,
                result.data.drinks[0].strMeasure10,
                result.data.drinks[0].strMeasure11,
                result.data.drinks[0].strMeasure12,
                result.data.drinks[0].strMeasure13,
                result.data.drinks[0].strMeasure14,
                result.data.drinks[0].strMeasure15,
            ];
            let both = [
                `${result.data.drinks[0].strMeasure1} ${result.data.drinks[0].strIngredient1}`,
                `${result.data.drinks[0].strMeasure2} ${result.data.drinks[0].strIngredient2}`,
                `${result.data.drinks[0].strMeasure3} ${result.data.drinks[0].strIngredient3}`,
                `${result.data.drinks[0].strMeasure4} ${result.data.drinks[0].strIngredient4}`,
                `${result.data.drinks[0].strMeasure5} ${result.data.drinks[0].strIngredient5}`,
                `${result.data.drinks[0].strMeasure6} ${result.data.drinks[0].strIngredient6}`,
                `${result.data.drinks[0].strMeasure7} ${result.data.drinks[0].strIngredient7}`,
                `${result.data.drinks[0].strMeasure8} ${result.data.drinks[0].strIngredient8}`,
                `${result.data.drinks[0].strMeasure9} ${result.data.drinks[0].strIngredient9}`,
                `${result.data.drinks[0].strMeasure10} ${result.data.drinks[0].strIngredient10}`,
                `${result.data.drinks[0].strMeasure11} ${result.data.drinks[0].strIngredient11}`,
                `${result.data.drinks[0].strMeasure12} ${result.data.drinks[0].strIngredient12}`,
                `${result.data.drinks[0].strMeasure13} ${result.data.drinks[0].strIngredient13}`,
                `${result.data.drinks[0].strMeasure14} ${result.data.drinks[0].strIngredient14}`,
                `${result.data.drinks[0].strMeasure15} ${result.data.drinks[0].strIngredient15}`,
            ];
            formattedDrink = {
                "id": result.data.drinks[0].idDrink,
                "name": result.data.drinks[0].strDrink,
                "category": result.data.drinks[0].strCategory,
                "glass": result.data.drinks[0].strGlass,
                "instructions": result.data.drinks[0].strInstructions,
                "deutschInstructions": result.data.drinks[0].strInstructionsDE,
                "image": result.data.drinks[0].strDrinkThumb,
                "ingredients": ingredients.filter((each) => {
                    return each != null;
                }),
                "units": units.filter((each) => {
                    return each != null;
                }),
                "both": both.filter((each) => {
                    return each != `${null} ${null}`;
                }),
                "source": "api"
            }
            console.log(`backend random cocktail: `, formattedDrink);
            res.send(formattedDrink);
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
    })
});

app.get('/byIngredient', (req, res) => {
    console.log(`req coming in`)
    let searchValue = req.query.search;
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`)
        .then((result) => { 
            console.log(`result: `, result.data)
            res.send(result.data.drinks);
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
        })
});

app.get('/byId', (req, res) => {
    let cocktailId = req.query.id;
    console.log(`req.query`, cocktailId);
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
        .then((result) => {
            console.log(`byId result: `, result.data.drinks)
            let ingredients = [
                result.data.drinks[0].strIngredient1,
                result.data.drinks[0].strIngredient2,
                result.data.drinks[0].strIngredient3,
                result.data.drinks[0].strIngredient4,
                result.data.drinks[0].strIngredient5,
                result.data.drinks[0].strIngredient6,
                result.data.drinks[0].strIngredient7,
                result.data.drinks[0].strIngredient8,
                result.data.drinks[0].strIngredient9,
                result.data.drinks[0].strIngredient10,
                result.data.drinks[0].strIngredient11,
                result.data.drinks[0].strIngredient12,
                result.data.drinks[0].strIngredient13,
                result.data.drinks[0].strIngredient14,
                result.data.drinks[0].strIngredient15,
            ];
            let units = [
                result.data.drinks[0].strMeasure1,
                result.data.drinks[0].strMeasure2,
                result.data.drinks[0].strMeasure3,
                result.data.drinks[0].strMeasure4,
                result.data.drinks[0].strMeasure5,
                result.data.drinks[0].strMeasure6,
                result.data.drinks[0].strMeasure7,
                result.data.drinks[0].strMeasure8,
                result.data.drinks[0].strMeasure9,
                result.data.drinks[0].strMeasure10,
                result.data.drinks[0].strMeasure11,
                result.data.drinks[0].strMeasure12,
                result.data.drinks[0].strMeasure13,
                result.data.drinks[0].strMeasure14,
                result.data.drinks[0].strMeasure15,
            ];
            let both = [
                `${result.data.drinks[0].strMeasure1} ${result.data.drinks[0].strIngredient1}`,
                `${result.data.drinks[0].strMeasure2} ${result.data.drinks[0].strIngredient2}`,
                `${result.data.drinks[0].strMeasure3} ${result.data.drinks[0].strIngredient3}`,
                `${result.data.drinks[0].strMeasure4} ${result.data.drinks[0].strIngredient4}`,
                `${result.data.drinks[0].strMeasure5} ${result.data.drinks[0].strIngredient5}`,
                `${result.data.drinks[0].strMeasure6} ${result.data.drinks[0].strIngredient6}`,
                `${result.data.drinks[0].strMeasure7} ${result.data.drinks[0].strIngredient7}`,
                `${result.data.drinks[0].strMeasure8} ${result.data.drinks[0].strIngredient8}`,
                `${result.data.drinks[0].strMeasure9} ${result.data.drinks[0].strIngredient9}`,
                `${result.data.drinks[0].strMeasure10} ${result.data.drinks[0].strIngredient10}`,
                `${result.data.drinks[0].strMeasure11} ${result.data.drinks[0].strIngredient11}`,
                `${result.data.drinks[0].strMeasure12} ${result.data.drinks[0].strIngredient12}`,
                `${result.data.drinks[0].strMeasure13} ${result.data.drinks[0].strIngredient13}`,
                `${result.data.drinks[0].strMeasure14} ${result.data.drinks[0].strIngredient14}`,
                `${result.data.drinks[0].strMeasure15} ${result.data.drinks[0].strIngredient15}`,
            ]
            formattedDrink = {
                "id": result.data.drinks[0].idDrink,
                "name": result.data.drinks[0].strDrink,
                "category": result.data.drinks[0].strCategory,
                "glass": result.data.drinks[0].strGlass,
                "instructions": result.data.drinks[0].strInstructions,
                "deutschInstructions": result.data.drinks[0].strInstructionsDE,
                "image": result.data.drinks[0].strDrinkThumb,
                "ingredients": ingredients.filter((each) => {
                    return each != null;
                }),
                "units": units.filter((each) => {
                    return each != null;
                }),
                "both": both.filter((each) => {
                    return each != `${null} ${null}`;
                }),
                "source": "api"
            }
            console.log(`backend random cocktail: `, formattedDrink);
            res.send(formattedDrink);
            })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
    })
});

module.exports = app;
