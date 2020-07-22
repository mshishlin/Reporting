import React from 'react';
import classes from './Input.module.scss';
import { ValidationRules } from '../../../validation/ValidationRules';

export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    errorMessage?: string;
    label?: string;
    shouldValidate?: boolean;
    touched?: boolean;
    valid?: boolean;
    validation?: ValidationRules;
}

const isInvalid = ({ valid, touched, shouldValidate }: InputProps) => {
    return shouldValidate && touched && !valid;
};

export const Input = (props: InputProps) => {
    const inputType = props.type || 'text';
    const htmlFor = `${inputType}_${Math.random()}`;

    const cls = [classes.input];

    const inputIsInvalid = isInvalid(props);
    if (inputIsInvalid) {
        cls.push(classes.invalid);
    }

    if (props.className) {
        cls.push(props.className);
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input id={htmlFor} name={props.name} onChange={props.onChange} type={inputType} value={props.value} />

            {inputIsInvalid ? <span>{props.errorMessage || 'Введено неверное значение'}</span> : null}
        </div>
    );
};

export const renderInputs = (formControls: { [propName: string]: InputProps }) => {
    return (Object.keys(formControls) as Array<keyof typeof formControls>).map((controlName, index) => {
        return <Input key={index} {...formControls[controlName]} />;
    });
};
