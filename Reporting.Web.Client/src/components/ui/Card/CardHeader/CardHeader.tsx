import React, { ReactNode } from 'react';
import classes from './CardHeader.module.scss';

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export const CardHeader = (props: CardHeaderProps): JSX.Element => {
    const cls = [classes['card-header']];

    if (props.className) {
        cls.push(props.className);
    }

    return <div className={cls.join(' ')}>{props.children}</div>;
};
