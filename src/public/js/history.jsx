import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function History (props) {
    const [history, setHistory] = useState([]);

    useEffect(()=> {
        let isMounted = true;
        if (isMounted) {
            let tempHistory = props.historyArray;
            setHistory(tempHistory);
        }
        return (() => {
                isMounted = false;
            }
        )   
    }, [props.historyLen]);

    const updateList = () => {
        return (
            history.map((cocktail, key) => {
                return  (
                    <Link to='/oneCocktail' key={ key } replace>
                        <p className="history-cocktail-title" onClick={() => props.recallHistory(cocktail.id)}>{ cocktail.name }</p>
                    </Link>
                )
            })
        )
    }

    return (
        <>
            <div className="history-container" key={props}>
                <div className="title-box">
                    <h4 className="history-title">History</h4>
                </div>
                { updateList() }
            </div>
        </>
    )
};

export default History;
