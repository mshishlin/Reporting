import { DELETE_QUARTER } from './quarterActionTypes';
import { Quarter } from '../../models/Quarter';

export const deleteQuarter = (quarter: Quarter) => {
    return {
        type: DELETE_QUARTER,
        payload: quarter,
    };
};
