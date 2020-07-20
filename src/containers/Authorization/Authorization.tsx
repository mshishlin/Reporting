import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Authorization.module.scss';
import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { CardHeader } from '../../components/ui/Card/CardHeader/CardHeader';
import { CardContent } from '../../components/ui/Card/CardContent/CardContent';
import { InputProps, renderInputs } from '../../components/ui/Input/Input';
import { AuthData } from '../../models/AuthData';
import User from '../../models/User';
import { oAuthGoogleSignIn, signIn } from '../../redux/actions/authenticationActions';
import { validateControl, validateForm } from '../../validation/validation';

interface AuthForm {
    errorMessage: string;
    formControls: {
        login: InputProps;
        password: InputProps;
    };
    isFormValid: boolean;
}

interface AuthorizationProps {
    oAuthGoogleSignInAsync: () => any;
    signInAsync: (authData: AuthData) => any;
    users: User[];
}

class Authorization extends Component<AuthorizationProps> {
    state: AuthForm = {
        errorMessage: '',
        formControls: {
            login: {
                errorMessage: 'Минимальная длина логина - 4 символа',
                label: 'Логин',
                name: 'login',
                onChange: this.onChangeHandler.bind(this),
                shouldValidate: true,
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 3,
                },
                value: '',
            },
            password: {
                errorMessage: 'Минимальная длина пароля - 4 символа',
                label: 'Пароль',
                name: 'password',
                onChange: this.onChangeHandler.bind(this),
                shouldValidate: true,
                touched: false,
                type: 'password',
                valid: false,
                validation: {
                    required: true,
                    minLength: 3,
                },
                value: '',
            },
        },
        isFormValid: false,
    };

    onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const controlName = event.target.name;
        const controlValue = event.target.value;

        const formControls = { ...this.state.formControls };
        const formControl = { ...formControls[controlName as keyof typeof formControls] };

        formControl.value = controlValue;
        formControl.touched = true;
        formControl.valid = validateControl(controlValue, formControl.validation);

        formControls[controlName as keyof typeof formControls] = formControl;

        this.setState({ formControls, isFormValid: validateForm(formControls), errorMessage: '' });
    }

    onSubmitHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        const login = this.state.formControls.login.value;
        const password = this.state.formControls.password.value;

        if (this.props.users.some((u) => u.login === login && u.password === password)) {
            this.props.signInAsync({ login, password });
        } else {
            this.setState({ errorMessage: 'Введен некорректный логин и/или пароль.' });
        }
    }

    render() {
        return (
            <div className={classes.authorization}>
                <Card className={classes['card-content']}>
                    <CardHeader>Вход в систему</CardHeader>
                    <CardContent>
                        {this.state.errorMessage ? <span className={classes.invalid}>{this.state.errorMessage}</span> : null}

                        <form className={classes['authorization-form']}>
                            {renderInputs(this.state.formControls)}
                            <Button disabled={!this.state.isFormValid} onClick={this.onSubmitHandler.bind(this)}>
                                Войти
                            </Button>
                        </form>
                        <div className={classes['google-link']} onClick={this.props.oAuthGoogleSignInAsync.bind(this)}>
                            Войти с помощью аккаунта Google?
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        users: state.users.users,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        oAuthGoogleSignInAsync: () => dispatch(oAuthGoogleSignIn()),
        signInAsync: (authData: AuthData) => dispatch(signIn(authData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
