import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './Authorization.module.scss';
import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { CardHeader } from '../../components/ui/Card/CardHeader/CardHeader';
import { CardContent } from '../../components/ui/Card/CardContent/CardContent';
import { Input } from '../../components/ui/Input/Input';
import { AuthData } from '../../models/AuthData';
import User from '../../models/User';
import { oAuthGoogleSignIn, signIn } from '../../redux/actions/authenticationActions';
import { UsersReducerState } from '../../redux/reducers/usersReducer';

interface AuthorizationProps {
    oAuthGoogleSignInAsync: () => any;
    signInAsync: (authData: AuthData, users: User[]) => any;
    usersState: UsersReducerState;
}

const authDataInitialState: AuthData = {
    login: '',
    password: '',
};

const Authorization = (props: AuthorizationProps): JSX.Element => {
    const [authData, setAuthData] = useState(authDataInitialState);

    const onLoginChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthData({
            ...authData,
            login: event.target.value,
        });
    };

    const onPasswordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthData({
            ...authData,
            password: event.target.value,
        });
    };

    const onSubmitHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        props.signInAsync(authData, props.usersState.users);
    };

    return (
        <div className={classes.authorization}>
            <Card className={classes['card-content']}>
                <CardHeader>Вход в систему</CardHeader>
                <CardContent>
                    <form className={classes['authorization-form']}>
                        <Input label="Логин" onChange={onLoginChangeHandler} value={authData.login} />
                        <Input label="Пароль" onChange={onPasswordChangeHandler} type="password" value={authData.password} />
                        <Button onClick={onSubmitHandler}>Войти</Button>
                    </form>
                    <div className={classes['google-link']} onClick={props.oAuthGoogleSignInAsync}>
                        Войти с помощью Google?
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        usersState: state.users,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        oAuthGoogleSignInAsync: () => dispatch(oAuthGoogleSignIn()),
        signInAsync: (authData: AuthData, users: User[]) => dispatch(signIn(authData, users)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
