import { SAVE_REPORT } from './reportActionTypes';
import { Report } from '../../models/Report';

export const saveReport = (report: Report) => {
    return {
        type: SAVE_REPORT,
        payload: report,
    };
};
