import { SIGN_IN, SIGN_OUT } from './authenticationActionTypes';
import { AuthData } from '../../models/AuthData';
import User from '../../models/User';

export const signIn = (payload: AuthData, users: User[]) => {
    return (dispatch: any) => {
        if (users.some((u) => u.login === payload.login && u.password === payload.password)) {
            localStorage.setItem('signed_in', 'true');

            dispatch({
                type: SIGN_IN,
            });
        } else {
            console.log('Invalid username or password');
        }
    };
};

export const oAuthGoogleSignIn = () => {
    return (dispatch: any) => {
        window.gapi.auth2
            .getAuthInstance()
            .signIn()
            .then((googleUser: any) => {
                localStorage.setItem('signed_in', 'true');

                dispatch({
                    type: SIGN_IN,
                });
            })
            .catch((err) => console.log(err));
    };
};

export const signOut = () => {
    localStorage.removeItem('signed_in');

    return {
        type: SIGN_OUT,
    };
};
