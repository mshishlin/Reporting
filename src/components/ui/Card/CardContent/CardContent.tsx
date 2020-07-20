import React, { ReactNode } from 'react';
import classes from './CardContent.module.scss';

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export const CardContent = (props: CardContentProps): JSX.Element => {
    const cls = [classes['card-content']];

    if (props.className) {
        cls.push(props.className);
    }

    return <div className={cls.join(' ')}>{props.children}</div>;
};
