import React, { useState, useEffect } from 'react';
import { KeypadComponent } from '../calcComponents/keypadComponent';
import { OutputComponent } from '../calcComponents/outputComponent';
import { OperandContext } from './OperandContext';
import './calculator.css';

export function Calculator(props) {
    const [previousOperand, setPreviousOperand] = useState("");
    const [currentOperand, setCurrentOperand] = useState("0");
    const [calculated, setCalculated] = useState(false);

    useEffect(() => {
        document.title = "Calculator";
    })

    const handleClick = (className, buttonName) => {
        switch(className) {
            case "equals":
                calculate();
                break;
            case "C":
                clear();
                break;
            case "DEL":
                backspace();
                break;
            case "number":
                handleNumber(buttonName);
                break;
            case "operator":
                handleOperator(buttonName);
                break;
            default:
                return;
        }
    }


    const calculate = () => {
        if (calculated) return;

        let entireExpression = previousOperand + " " + currentOperand;
        entireExpression = entireExpression.replace(/×/g, "*");
        entireExpression = entireExpression.replace(/÷/g, "/");

        let output;
        try {
            output = String(eval(entireExpression));
        } catch (error) {
            output = "ERROR";
        }
        
        setPreviousOperand("");
        setCurrentOperand(output);
        setCalculated(true);
    }


    const clear = () => {
        setPreviousOperand("");
        setCurrentOperand("0");
        setCalculated(false);
    }


    const backspace = () => {
        let currOpTemp = currentOperand.slice(0,-1);
        if (currOpTemp === "") currOpTemp = '0';

        setCurrentOperand(currOpTemp);
    }


    const handleOperator = (buttonName) => {
        let prevOpTemp;

        if (previousOperand === "" || calculated) {
            prevOpTemp = currentOperand + " " + buttonName;
        } else {
            prevOpTemp = previousOperand + " " + currentOperand + " " + buttonName;
        }

        setPreviousOperand(prevOpTemp);
        setCurrentOperand("");
        setCalculated(false);
    }


    const handleNumber = (buttonName) => {
        let currOpTemp = currentOperand;

        if (calculated) currOpTemp = "";
        
        if (buttonName === '.' && currOpTemp.includes('.')) return;

        if (canOverwrite(buttonName)) {
            currOpTemp = buttonName;
        } else {
            currOpTemp = currOpTemp + buttonName
        }
        
        setCurrentOperand(currOpTemp);
        setCalculated(false);
    }


    const canOverwrite = (buttonName) => {
        if (Number(currentOperand) === 0 && buttonName !== '.' && !currentOperand.includes('.')) return true;
        return false;
    }
  
    return (
        <OperandContext.Provider value={{ currentOperand, previousOperand, handleClick }}>
            <div className="calculator-body">
                <OutputComponent/>
                <KeypadComponent/>
            </div>
        </OperandContext.Provider>      
    );
  
}