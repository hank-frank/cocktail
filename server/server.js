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

// const cocktailRoutes = require('./routes/cocktailRoutes.js');
// const receptacleRoutes = require('./routes/receptacleRoutes.js');
// const ingredientRoutes = require('./routes/ingredientRoutes.js');

Cocktail.Receptacles = Cocktail.hasOne(Receptacle);
// Receptacle.belongsToMany(Cocktail, {through: 'Receptacle_Cocktail'});
Cocktail.Ingredients = Cocktail.hasMany(Ingredient);



sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
// sequelize.sync();
// Cocktail.create({
//     api_id: "12345",
//     cocktail_name: "Watermelon Thunder",
//     instructions: "make it real good",
//     source: "backend testing",
//     ingredients: [
//         {ingredient_name: "Teeth"},
//         {ingredient_name: "unicorn horn"}
//     ],
//     receptacle: {
//         receptacle_name: "A big Bucket"
//     }
// }, {
//     include: [{
//         association: Cocktail.Receptacle
//     }, {
//         association: Cocktail.Ingredients
// }]
// })
// .then((cocktail) => {
//     console.log(`cocktail: `, cocktail);
    
// })

// Cocktail.findAll({
//     where: {
//         cocktail_name: "Watermelon Thunder"
//     }
// }).then((cocktails) => {
//     cocktails.forEach((each) => {
//         console.log(`forEach: `, each.dataValues.id_cocktail);
//         Receptacle.findAll({
//             where: {
//                 cocktailIdCocktail: each.dataValues.id_cocktail
//             }
//         }).then((receptacle) => {
//             each.glass = receptacle;
//             console.log(`from receptacle .then: `, each)
//         })
//     })
//     // console.log(cocktail);
// })

// Receptacle.findAll()
// .then((glass)=> {
//     console.log(glass);
// })

// Ingredient.findAll()
// .then((ingredients) => {
//     console.log(ingredients);
// })

app.use(express.static('dist'));
// app.use(express.static('src'));

app.use(express.json());

app.get('/dbTest', (req, res) => {
    let id = req.query.id;
    let name = req.query.name;
    let glass = req.query.glass;
    let instructions = req.query.instructions;
    let both = req.query.both;
    let source = req.query.source;

    let ingArr = both.split(',');

    function formatIngredients () {
        return ingArr.map((ingredient) => {
            return ( 
                { ingredient_name: `${ingredient}`}
            )
        })
    }

    Cocktail.create({
        api_id: id,
        cocktail_name: name,
        instructions: instructions,
        source: source,
        ingredients: formatIngredients(),
        receptacle: {
            receptacle_name: glass
        }
    }, {
        include: [{
            association: Cocktail.Receptacles
        }, {
            association: Cocktail.Ingredients
        }]
    })
    .then((cocktail) => {
        console.log(`cocktail after insert: `, cocktail);
    })
    .catch((err) => console.log(`create: `, err));

    console.log(`incomming data: `, id, name, glass, instructions, both, source);
})

app.get('/getOne', (req, res) => {
    Cocktail.findOne({
        where: { cocktail_name: 'Moscow Mule'},
        include: [Ingredient, Receptacle],
    }).then((cocktail) => {
        let { id_cocktail, cocktail_name, instructions } = cocktail.dataValues;
        let glass = cocktail.dataValues.receptacle.dataValues.receptacle_name;
        let ingArr = cocktail.dataValues.ingredients;
        let newIngredients = [];
        ingArr.forEach((each) => {
            newIngredients.push(each.dataValues.ingredient_name);
        })

        formattedDrink = {
            "id": id_cocktail,
            "name": cocktail_name,
            "category": "alcoholic",
            "glass": glass,
            "instructions": instructions,
            "image": "",
            "ingredients": newIngredients,
            "both": newIngredients,
            "source": "dB",
            "favorite": false
        };

        res.send(formattedDrink);
    }).catch((err) => console.log(`create: `, err));
});



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
            res.send(result.data.drinks);
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
        })
});

app.get('/byId', (req, res) => {
    let cocktailId = req.query.id;
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_DB_API_KEY}/lookup.php?i=${cocktailId}`)
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
            res.send(formattedDrink);
            })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
    })
});

app.post('/createNew', (req, res) => {
    let cocktailObject = req.body;

    function formatIngredients () {
        return cocktailObject.both.map((ingredient) => {
            return ( 
                { ingredient_name: `${ingredient}`}
            )
        })
    }
    
    Cocktail.create({
        api_id: cocktailObject.id,
        cocktail_name: cocktailObject.name,
        instructions: cocktailObject.instructions,
        source: cocktailObject.source,
        ingredients: formatIngredients(),
        receptacles: {
            receptacle_name: cocktailObject.glass
        }
    }, {
        include: [{
            association: Cocktail.Receptacle,
            association: Cocktail.Ingredients
        }]
    })
    .then((cocktail) => {
        console.log(`new Created: `, cocktail);
        
    })
});


module.exports = app;
