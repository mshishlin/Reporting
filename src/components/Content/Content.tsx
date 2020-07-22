import React, { ReactNode } from 'react';
import classes from './Content.module.scss';

interface ContentProps {
    children: ReactNode;
}

export const Content = (props: ContentProps) => {
    return <div className={classes.content}>{props.children}</div>;
};
