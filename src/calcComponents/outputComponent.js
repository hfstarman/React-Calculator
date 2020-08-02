import React, { useContext } from 'react';

import './outputComponent.css';
import { OperandContext } from '../calculator/OperandContext';

export function OutputComponent(props){
    const { previousOperand, currentOperand } = useContext(OperandContext);

    return (
        <div className="output">
            <div className="previous-operand">{ previousOperand }</div>
            <div className="current-operand">{ currentOperand }</div>
        </div>
    );
}