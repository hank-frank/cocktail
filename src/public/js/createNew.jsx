import React, { useState, useEffect } from 'react';

import { useInput } from '../../hooks/useInput.jsx';

function Create (props) {
    const { value:name, bind:bindname, reset:resetname } = useInput('');
    const { value:glass, bind:bindglass, reset:resetglass } = useInput('');
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${name} ${glass}`);
        resetFirstName();
        resetLastName();
    };
    
    return (
        <>
            <div className="create-container">
                <div className="create-title-flex">
                    <h4 className="create-title">Input your own cocktail!</h4>
                </div>
                <div className="inputs-hor-flex">
                    <form className="inputs-vert-flex" onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" className="cocktail-input" {...bindname} />
                        </label>
                        <label>
                            Glass:
                            <input type="text" className="cocktail-input" {...bindglass} />
                        </label>
                        <input type="submit" value="Submit" className="inputs-submit"/>
                    </form>
                </div>
            </div>
        </>
    )
};

export default Create;