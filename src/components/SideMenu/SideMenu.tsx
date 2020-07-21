import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './SideMenu.module.scss';

export const SideMenu = () => {
    return (
        <div className={classes['side-menu']}>
            <ul>
                <li className={classes['menu-item']}>
                    <NavLink to="/reportlistview" exact>
                        Отчеты
                    </NavLink>
                </li>
                <li className={classes['menu-item']}>
                    <NavLink to="/quarterlistview" exact>
                        Кварталы
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};
