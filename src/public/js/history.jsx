import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function History (props) {
    let testing = () => {
        console.log(`from history: `, props.historyArray)
    };

    return (
        <>
            <div className="history-container">
                <div className="title-box">
                    <h4 className="history-title">History</h4>
                </div>
                {
                    props.historyArray.map((cocktail, key) => {
                        key++
                        return  (
                            <Link to='/oneCocktail'>
                                <p className="history-cocktail-title" onClick={() => props.recallHistory(cocktail.id)} key={ key }>{ cocktail.name }</p>
                            </Link>
                        )
                    })
                }
                {/* <button onClick={ testing() }>tester</button> */}
            </div>
        </>
    )
};

export default History;
