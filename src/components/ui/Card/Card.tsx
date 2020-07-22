import React, { ReactNode } from 'react';
import classes from './Card.module.scss';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card = (props: CardProps): JSX.Element => {
    const cls = [classes.card];

    if (props.className) {
        cls.push(props.className);
    }

    return <div className={cls.join(' ')}>{props.children}</div>;
};
