import { DELETE_REPORT, SAVE_REPORT } from './reportActionTypes';
import { Report } from '../../models/Report';

export const deleteReport = (report: Report) => {
    return {
        type: DELETE_REPORT,
        payload: report,
    };
};

export const saveReport = (report: Report) => {
    return {
        type: SAVE_REPORT,
        payload: report,
    };
};
