import React, { useState, useEffect } from 'react';

function History (props) {
    const [search, setSearch] = useState("")

    

    return (
        <>
        <div className="history-container">
            <div className="title-box">
                <h4 className="history-title">History</h4>
            </div>
                <p className="history-cocktail-title">Cocktail Name</p>
                <p className="history-cocktail-title">Cocktail Name</p>
                <p className="history-cocktail-title">Cocktail Name</p>
                <p className="history-cocktail-title">Cocktail Name</p>
                <p className="history-cocktail-title">Cocktail Name</p>
                <p className="history-cocktail-title">Cocktail Name</p>
                <p className="history-cocktail-title">Cocktail Name</p>
                <p className="history-cocktail-title">Cocktail Name</p>
                <p className="history-cocktail-title">Cocktail Name</p>
                <p className="history-cocktail-title">Cocktail Name</p>
        </div>
        </>
    )
};

export default History;