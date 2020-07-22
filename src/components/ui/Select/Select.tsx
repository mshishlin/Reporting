import React, { RefObject } from 'react';
import classes from './Select.module.scss';

interface SelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    reference: RefObject<HTMLSelectElement>;
}

export const Select = (props: SelectProps) => {
    return <select ref={props.reference} className={classes.select} disabled={props.disabled}>{props.children}</select>;
};
