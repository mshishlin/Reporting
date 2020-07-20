import React, { ReactNode } from 'react';
import classes from './Layout.module.scss';
import { Content } from '../Content/Content';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { SideMenu } from '../SideMenu/SideMenu';

interface LayoutProps {
    children: ReactNode;
    signOut: any;
}

export const Layout = (props: LayoutProps) => {
    return (
        <div className={classes.layout}>
            <div className={classes['layout-up']}>
                <Header signOut={props.signOut} />
                <div className={classes['layout-middle']}>
                    <SideMenu />
                    <Content>{props.children}</Content>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};
