import { Quarter } from '../../models/Quarter';
import { DELETE_QUARTER } from '../actions/quarterActionTypes';

interface QuartersReducerState {
    quarters: Quarter[];
}

const initState = () => {
    const quartersJson = localStorage.getItem('quarters');
    if (quartersJson) {
        return JSON.parse(quartersJson);
    }
    return {
        quarters: [
            {
                quarterNumber: 1,
                year: 2019,
            },
            {
                quarterNumber: 2,
                year: 2019,
            },
            {
                quarterNumber: 3,
                year: 2019,
            },
            {
                quarterNumber: 4,
                year: 2019,
            },
            {
                quarterNumber: 1,
                year: 2020,
            },
            {
                quarterNumber: 2,
                year: 2020,
            },
            {
                quarterNumber: 3,
                year: 2020,
            },
        ],
    };
};

export default function quartersReducer(state: QuartersReducerState = initState(), action: any) {
    switch (action.type) {
        case DELETE_QUARTER: {
            return {
                quarters: state.quarters.filter((q) => q.quarterNumber !== action.payload.quarterNumber || q.year !== action.payload.year),
            };
        }
        default:
            return state;
    }
}
