import React, { useState } from 'react';
import './Example.css';

function Example() {
    const [input, setInput] = useState('')

    const validate = () => {
        if(input){
            console.log('existuje')
        } else {
            console.log('neexistuje')
        }
    }
    const handleChange = (event) => {
        setInput(event.target.value)
        /*jupi*/ 
    }
    return(
        <>
            <label className='name'>Pouzivatelske meno:</label>
            <input type='text' value={input} onChange={handleChange}></input>
            <p>Moj input: {input}</p>
            <button onClick={validate}>Button</button>
        </>
    );
};  

export default Example;