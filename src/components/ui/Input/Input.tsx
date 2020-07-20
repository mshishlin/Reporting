import React from 'react';
import classes from './Input.module.scss';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    errorMessage?: string;
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
    const inputType = props.type || 'text';
    const htmlFor = `${inputType}_${Math.random()}`;

    const cls = [classes.input];

    if (props.errorMessage) {
        cls.push(classes.invalid);
    }

    if (props.className) {
        cls.push(props.className);
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input id={htmlFor} type={inputType} value={props.value} onChange={props.onChange} />

            <span>{props.errorMessage}</span>
        </div>
    );
};
