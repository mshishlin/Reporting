import User from '../../models/User';

export interface UsersReducerState {
    users: User[];
}

const initialState: UsersReducerState = {
    users: [
        {
            login: 'test1',
            password: 'test1',
        },
        {
            login: 'test2',
            password: 'test1',
        },
    ],
};

export default function usersReducer(state: UsersReducerState = initialState, action: any) {
    switch (action.type) {
        default:
            return state;
    }
}
