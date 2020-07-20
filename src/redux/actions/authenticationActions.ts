import { SIGN_IN, SIGN_OUT } from './authenticationActionTypes';
import { AuthData } from '../../models/AuthData';

export const signIn = (payload: AuthData) => {
    return (dispatch: any) => {
        localStorage.setItem('signed_in', 'true');

        dispatch({
            type: SIGN_IN,
        });
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
