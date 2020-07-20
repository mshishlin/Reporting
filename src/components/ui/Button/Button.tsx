import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const Button = (props: ButtonProps): JSX.Element => {
    const cls = [classes.button];

    if (props.className) {
        cls.push(props.className);
    }

    return (
        <button className={cls.join(' ')} disabled={props.disabled} onClick={props.onClick} type={props.type}>
            {props.children}
        </button>
    );
};
