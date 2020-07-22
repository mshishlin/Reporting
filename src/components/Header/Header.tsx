import React from 'react';
import classes from './Header.module.scss';

interface HeaderProps {
    signOut: any;
}

export const Header = (props: HeaderProps) => {
    return (
        <div className={classes.header}>
            <span>QPD (Тестовое задание по заполнению отчета, Максим Шишлин)</span>
            <div className={classes.exit} onClick={props.signOut}>
                Выход из системы
            </div>
        </div>
    );
};
