import { SIGN_IN, SIGN_OUT } from '../actions/authenticationActionTypes';

interface AuthenticatedReducerState {
    isAuthenticated: boolean;
}

const initialState: AuthenticatedReducerState = {
    isAuthenticated: !!localStorage.getItem('signed_in'),
};

export default function authentication(state: AuthenticatedReducerState = initialState, action: any) {
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
