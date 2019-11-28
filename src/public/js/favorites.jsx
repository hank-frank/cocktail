import React, { useState, useEffect } from 'react';

function Favorites (props) {
    const [search, setSearch] = useState("")

    
    return (
        <>
            <div className="fav-title-box">
                <h4 className="fav-title">Favorites</h4>
            </div>
            <p className="fav-cocktail-title">Cocktail Name</p>
            <p className="fav-cocktail-title">Cocktail Name</p>
            <p className="fav-cocktail-title">Cocktail Name</p>
            <p className="fav-cocktail-title">Cocktail Name</p>
            <p className="fav-cocktail-title">Cocktail Name</p>
            <p className="fav-cocktail-title">Cocktail Name</p>
            <p className="fav-cocktail-title">Cocktail Name</p>
            <p className="fav-cocktail-title">Cocktail Name</p>
            <p className="fav-cocktail-title">Cocktail Name</p>
            <p className="fav-cocktail-title">Cocktail Name</p>
        </>
    )
};

export default Favorites;