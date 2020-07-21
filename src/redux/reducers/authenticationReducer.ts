import { SIGN_IN, SIGN_OUT } from '../actions/authenticationActionTypes';

interface AuthenticatedReducerState {
    isAuthenticated: boolean;
}

const initState = () => {
    const signedInJson = localStorage.getItem('signed_in');
    if (signedInJson) {
        return {
            isAuthenticated: JSON.parse(signedInJson),
        };
    }

    return {
        isAuthenticated: false,
    };
};

export default function authentication(state: AuthenticatedReducerState = initState(), action: any) {
    switch (action.type) {
        case SIGN_IN: {
            return {
                isAuthenticated: true,
            };
        }
        case SIGN_OUT: {
            return {
                isAuthenticated: false,
            };
        }
        default: {
            return state;
        }
    }
}
