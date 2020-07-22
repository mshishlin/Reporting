import { DELETE_QUARTER, SAVE_QUARTER } from './quarterActionTypes';
import { Quarter } from '../../models/Quarter';

export const deleteQuarter = (quarter: Quarter) => {
    return {
        type: DELETE_QUARTER,
        payload: quarter,
    };
};

export const saveQuarter = (oldQuarter: Quarter, newQuarter: Quarter) => {
    return {
        type: SAVE_QUARTER,
        payload: {
            oldQuarter,
            newQuarter,
        },
    };
};
