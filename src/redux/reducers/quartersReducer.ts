import { Quarter } from '../../models/Quarter';
import { DELETE_QUARTER, SAVE_QUARTER } from '../actions/quarterActionTypes';

const quarterSortableCallback = (a: Quarter, b: Quarter) => {
    if (a.year > b.year) return -1;
    if (a.year < b.year) return 1;

    if (a.quarterNumber > b.quarterNumber) return -1;
    if (a.quarterNumber < b.quarterNumber) return 1;

    return 0;
};

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
                quarters: state.quarters
                    .filter((q) => q.year !== action.payload.year || q.quarterNumber !== action.payload.quarterNumber)
                    .sort(quarterSortableCallback),
            };
        }

        case SAVE_QUARTER: {
            const quarters = state.quarters.filter(
                (q) => q.year !== action.payload.oldQuarter.year || q.quarterNumber !== action.payload.oldQuarter.quarterNumber
            );

            quarters.push(action.payload.newQuarter);

            return { quarters: quarters.sort(quarterSortableCallback)};
        }

        default:
            return state;
    }
}
