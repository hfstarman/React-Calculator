import React, { useContext } from 'react';

import './keypadComponent.css';
import { OperandContext } from '../calculator/OperandContext';

export function KeypadComponent(props) {
    const buttonNames = [
        'C', 'DEL', '÷', 
        '7', '8', '9', '×', 
        '4', '5', '6', '+', 
        '1', '2', '3', '-', 
        '.', '0', '='
    ];

    const classNames = [
        'C', 'DEL', 'operator',
        'number', 'number', 'number', 'operator',
        'number', 'number', 'number', 'operator',
        'number', 'number', 'number', 'operator',
        'number', 'number', 'equals'
    ];

    const { handleClick } = useContext(OperandContext);
    return (
        <div className="keypad">
            {
                buttonNames.map( (name, index) => {
                    return (
                        <button 
                        key={index} 
                        className={classNames[index]} 
                        name={name} 
                        onClick={e => handleClick(e.target.className, e.target.name)}>{name}</button>
                    );
                })
            }
        </div>
    );
}