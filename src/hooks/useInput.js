import { useState } from "react";

export function useInput(defaultValue, validationFn) {
    const [enteredInput, setEnteredInput] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredInput);

    function handleInputBlur() {
        setDidEdit(true)
    }

    function handleChange(event) {
        setEnteredInput(event.target.value);
        setDidEdit(false);
    }

    function reset(){
        setDidEdit(false);
        setEnteredInput('');
    }

    return {
        value: enteredInput,
        handleInputBlur,
        handleChange,
        reset,
        hasError: didEdit && !valueIsValid
    };
}