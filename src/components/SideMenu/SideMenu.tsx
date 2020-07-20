import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './SideMenu.module.scss';

export const SideMenu = () => {
    return (
        <div className={classes['side-menu']}>
            <ul>
                <li className={classes['menu-item']}>
                    <NavLink to="/" exact>
                        Main
                    </NavLink>
                </li>
                <li className={classes['menu-item']}>
                    <NavLink to="/report" exact>
                        Report
                    </NavLink>
                </li>
                <li className={classes['menu-item']}>
                    <NavLink to="/about" exact>
                        About
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};
