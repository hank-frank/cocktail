const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
// const mysql = require('mysql');

dotenv.config();

const app = express();

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "AfkVVRg963xP2kc",
//     database: "testDB"
// });

const sequelize = require('./util/database.js');

const Cocktail = require('./models/cocktailModel.js')
const Receptacle = require('./models/receptacleModel.js');
const Ingredient = require('./models/ingredientModel.js')

const cocktailRoutes = require('./routes/cocktailRoutes.js');
const receptacleRoutes = require('./routes/receptacleRoutes.js');
const ingredientRoutes = require('./routes/ingredientRoutes.js');

Cocktail.hasOne(Receptacle);
Receptacle.belongsToMany(Cocktail, {through: 'Receptacle_Cocktail'});
Cocktail.hasMany(Ingredient);
Ingredient.belongsToMany(Cocktail, {through: 'Ingredient_Cocktail'});


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
// sequelize.sync();


Cocktail.create({
    api_id: "12345",
    cocktail_name: "Watermelon Thunder",
    instructions: "make it real good",
    source: "backend testing"
}).then((cocktail) => {
    console.log(`a new cocktail: `, cocktail.id)
})


app.use(express.static('dist'));
// app.use(express.static('src'));

app.use(express.json());

app.get('/randomCocktail', (req, res) => {
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_DB_API_KEY}/random.php`)
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
                "source": "api",
                "favorite": false
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
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_DB_API_KEY}/filter.php?i=${searchValue}`)
        .then((result) => { 
            console.log(`result: `, result.data)
            res.send(result.data.drinks);
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
        })

        //this is here for multi ingredient searches. 
        //https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Dry_Vermouth,Gin,Anis
});

app.get('/tenRandom', (req, res) => {
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_DB_API_KEY}/randomselection.php`)
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
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_DB_API_KEY}/lookup.php?i=${cocktailId}`)
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
                "source": "api",
                "favorite": false
            }
            console.log(`backend random cocktail: `, formattedDrink);
            res.send(formattedDrink);
            })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
    })
});

app.post('/createNew', (req, res) => {
let testCocktail = {
    "name": 'lemon something',
    "category": "alcoholic",
    "glass": "bucket",
    "instructions": "dump it all in", 
    "ingredients": [
        "vodka", "gin", "lemons", "campari", "antica"
    ],
    "units": [
        1, 1, 1, 1, 2
    ],
    "both": [
        "1 vodka", "1 gin", "1 lemons", "1 campari", "2 antica"
    ],
    "source": "local",
    "favorite": "false"
}

    let cocktailObject = req.body;
    console.log(`post to backend createNew route worked:`, cocktailObject);
    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected baby!");
    //     var sql = "";
    //     con.query(sql, function (err, result) {
    //         if (err) throw err;
    //         console.log("A cocktail was added to the DB Chief!");
    //     });
    // });
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected baby!");
//     var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("table testDB created");
//     });
// });



module.exports = app;
