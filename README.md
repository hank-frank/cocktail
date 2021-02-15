# Cocktail Viewer
This is a [React](https://reactjs.org/)/[Parcel](https://parceljs.org/)/[Sequelize](https://sequelize.org/)/SQL app for searching cocktail recipes. 

It uses the [Cocktail DB](https://www.thecocktaildb.com/), they're a great resource who run multiple different API's and are worth a look. 

### env's

###### Production
```
NODE_ENV=
```
The NODE_ENV needs to be 'production' for the DB config to work with the production DB config. 
```
PROD_DATABASE=
PROD_DB_USER=
PROD_DB_PASSWORD=
PROD_DB_HOST=
PROD_DB_PORT=
```
###### Dev
```
DEV_DATABASE=
DEV_DB_USER=
DEV_DB_PASSWORD=
```
###### Always
```
COCKTAIL_DB_API_KEY=
JWT_SECRET=
```
###### Optional
```
PORT=
```
PORT if not present will default to 8000, you can use this env to specify a PORT if you want to use any other PORT

### To fire up locally:

To fire it up you will need to have the Always and Dev env's above. They are counting on you having an instance of mySQL running on your localhost using the default mySQL port 3306. 

There are the usual steps of cloning the repo using 
```
git clone https://github.com/hank-frank/cocktail.git
```
then 
```
npm install
```
and either 
```
npm run watch
```
or
```
npm run build
```
'watch' will keep a build refresh going with each save, if you do you'll want to keep it in one terminal while you runs start from another and 'build' just runs the build once. 

Then:  
```
npm start
```

With it started you can visit it at http://localhost:8000/ or whichever port you used if you used the env to change it. 

If its the first fire up you will need to register a user who can login before you can login. That can be done at http://localhost:8000/#/register or by following the 'redirect' link in the header. 

After that you can login and start searching.

The search bar searches by ingredient. 

The 2 buttons below that will either bring up one random cocktail or show teh search results with 10 random cocktails. 

The ability exists to create your own cocktails to be put in the DB. 

visit http://localhost:8000/#/addCocktail or click 'create' in the header. 

From there you will need to enter all of the info for your cocktail and submit. From that point on it will be included in the search results. 

There currently isn't a place to attach images to cocktails you create. This is in the works. 

### To fire up in production:

The production version of this project is formatted to be deployed on [Heroku](https://www.heroku.com) with a [Heroku Postgress DB](https://www.heroku.com/postgres). As long as you use the correct env's above for your Postgress connection and deploy to Heroku you'll be good to go. The most important env being 
```
NODE_ENV=production
``` 
which will need to be set to 'production' for the DB config to use the Postgress connection rather than the mySQL config. 




