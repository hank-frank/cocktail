const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const withAuth = require('./withAuth.js');
const crypto = require('crypto');
const favicon = require('serve-favicon');
const path = require('path');
// Op is for super target searches, accepts regex-esque queries
const { Op } = require("sequelize");

const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(favicon(path.join(__dirname,'img','favicon.ico')));

const secret = process.env.JWT_SECRET;

const sequelize = require('./util/database.js');

const Cocktail = require('./models/cocktailModel.js');
const Receptacle = require('./models/receptacleModel.js');
const Ingredient = require('./models/ingredientModel.js');
const User = require('./models/userModel.js')

Cocktail.Receptacles = Cocktail.hasOne(Receptacle);
Cocktail.Ingredients = Cocktail.hasMany(Ingredient);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    
//used to regenerate tables or if I add a new table this will build it
sequelize.sync();

app.use(express.static('dist'));

app.use(express.json());

const genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

const sha512 = function(password, salt){
    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    const salt = genRandomString(16); /** Gives us salt of length 16 */
    const passwordData = sha512(userpassword, salt);
    // console.log('UserPassword = '+userpassword);
    // console.log('Passwordhash = '+passwordData.passwordHash);
    // console.log('nSalt = '+passwordData.salt);
    return passwordData;
}

app.get('/dbTest', (req, res) => {
    let id = req.query.id;
    let name = req.query.name;
    let glass = req.query.glass;
    let instructions = req.query.instructions;
    let both = req.query.both;
    let source = req.query.source;
    let ingArr = both.split(',');
    let imageUrl = req.query.imageUrl;

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
        image_url: imageUrl,
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
        res.status(200).send(cocktail);
    })
    .catch((err) => console.log(`create: `, err));
})

app.get('/getOne', (req, res) => {
    Cocktail.findOne({
        where: { cocktail_name: 'Big Red'},
        include: [Ingredient, Receptacle],
    }).then((cocktail) => {
        console.log(`cocktail: `, cocktail);
        if (cocktail !== null) {
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
        } else {
            res.status(200).send("no drink found");
        }
    }).catch((err) => console.log(`create: `, err));
});

app.get('/randomCocktail', (req, res) => {
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_DB_API_KEY}/random.php`)
        .then((result) => {
            console.log('reault: ', result);
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

app.get('/byIngredient', async (req, res) => {
    let searchValue = req.query.search;
    
    axios.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_DB_API_KEY}/filter.php?i=${searchValue}`)
        .then( async (result) => {
            let apiArray = [];

            result.data.drinks.forEach((drink) => {
                drink.source = "api";
                apiArray.push(drink);
            });

            const looseIngredients = await Ingredient.findAll({
                where: { ingredient_name: {[Op.substring]: searchValue} }
            });

            let cocktailIds = await looseIngredients.map((each) => {
                return each.dataValues.cocktailIdCocktail;
            });

            const getDBCocktails = async () => {
                return Promise.all(cocktailIds.map((eachId) => {
                    return (
                        Cocktail.findOne({
                            where: { id_cocktail: eachId }
                        }).then((cocktail) => {
                            let { id_cocktail, cocktail_name, image_url } = cocktail.dataValues;
                        
                            formattedDrink = {
                                "strDrink": cocktail_name,
                                "strDrinkThumb": image_url,
                                "idDrink": id_cocktail,
                                "source": "db"
                            };
    
                            return formattedDrink;
                        }).catch((err) => {
                            console.log(`error in byIngredient catch: `, err)
                        })
                    );
                }))
            }

            getDBCocktails().then((dbCocktailArray) => {
                res.status(200).send([...dbCocktailArray, ...apiArray])
            });
            
        })
        .catch((error) => {
            console.error(error);
            res.send('An error occured.');
        })
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
    let source = req.query.source;
    
    if (source === "db") {
        Cocktail.findOne({
            where: { id_cocktail: cocktailId },
            include: [Ingredient, Receptacle],
        }).then((cocktail) => {
            if (cocktail !== null) {
                let { id_cocktail, cocktail_name, instructions } = cocktail.dataValues;
                let glass = cocktail.dataValues.receptacle.dataValues.receptacle_name;
                let ingArr = cocktail.dataValues.ingredients;
                let image = cocktail.dataValues.image_url;
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
                    "image": image,
                    "ingredients": newIngredients,
                    "both": newIngredients,
                    "source": "dB",
                    "favorite": false
                };

                res.send(formattedDrink);
            } else {
                res.status(200).send("no drink found");
            }
        }).catch((err) => console.log(`create: `, err));
    } else {
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
    }
});

app.post('/createNew', withAuth, (req, res) => {
    let cocktailObject = req.body;
    console.log(`cocktail Object: `, cocktailObject);
    function formatIngredients () {
        return cocktailObject.both.map((ingredient) => {
            return ( 
                { ingredient_name: `${ingredient}`}
            )
        })
    }

    Cocktail.create({
        cocktail_name: cocktailObject.name,
        instructions: cocktailObject.instructions,
        source: cocktailObject.source,
        ingredients: formatIngredients(),
        image_url: cocktailObject.image,
        receptacle: {
            receptacle_name: cocktailObject.glass
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
        res.status(200).send(cocktail);
    })
    .catch((err) => console.log(`create error: `, err));
});

app.post('/register', async (req, res) => {
    let userObject = req.body;
    let {userName, password} = userObject;
    let alreadyExists;

    try {
        alreadyExists = await User.findOne({
            where: {
                user_name: userName
            }
        });
    } catch {
        console.log({message: `failed`});
    }

    if (alreadyExists !== null) {
        if (alreadyExists.dataValues.user_name == userName) {
            res.status(200).send({message: `already-exists`});
        }
    } else {
        const newUser = await User.create({
            user_name: userName,
            password: password
        });
        res.status(200).send({user: newUser.dataValues.user_name})
    };
});

app.post('/userLogin', async (req, res) => {
    let userObject = req.body;
    let {userName, password} = userObject;
    let user;

    try {
        user = await User.findOne({
            where: {
                user_name: userName
            }
        });
    } catch {
        console.log(`find user failed`);
    }
    
    if (!user || user == null) {
        console.log(`no user`)
        res.status(200).send({message: `no user`})
    } else {
        if (user.dataValues.password == password) {
            const payload = { userName };
            const token = jwt.sign(payload, secret, { expiresIn: '1h'});
            res.cookie('token', token, { httpOnly: false }).status(200).send({user: user.dataValues.user_name});
        } else {
            res.status(200).send({message: `incorrect password`})
        }
    }
    console.log(`user: `, user);
});

app.get('/checkToken', withAuth, (req, res) => {
    res.status(200).send({valid: true})
})


module.exports = app;
