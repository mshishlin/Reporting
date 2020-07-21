import { Report } from '../../models/Report';
import { SAVE_REPORT } from '../actions/reportActionTypes';

interface ReportsReducerState {
    reports: Report[];
}

const initState = () => {
    const reportsJson = localStorage.getItem('reports');
    if (reportsJson) {
        return JSON.parse(reportsJson);
    }

    return {
        reports: [
            {
                quarter: {
                    quarterNumber: 3,
                    year: 2019,
                },

                // I. ВНЕОБОРОТНЫЕ АКТИВЫ
                intangibleAssets: 0,
                researchAndDevelopmentResults: 0,
                intangibleSearchAssets: 0,
                tangibleSearchAssets: 0,
                mainAssets: 0,
                profitableInvestmentInMaterialAssets: 12,
                financialInvestments: 0,
                defferedTaxAssets: 0,
                otherNonCurrentAssets: 0,
                totalsForSectionOne: 12,

                // II. ОБОРОТНЫЕ АКТИВЫ
                stocks: 0,
                valueAddedTaxOnAcquiredValues: 0,
                receivables: 0,
                financialInvestmentsExcludingCashEquivalents: 25,
                cashAndCashEquivalents: 0,
                otherCurrentAssets: 0,
                totalsForSectionTwo: 25,

                // БАЛАНС
                balans: 37,
            },
        ],
    };
};

export default function reportsReducer(state: ReportsReducerState = initState(), action: any) {
    switch (action.type) {
        case SAVE_REPORT: {
            const reports = state.reports.filter(
                (r) => r.quarter.year !== action.payload.quarter.year || r.quarter.quarterNumber !== action.payload.quarter.quarterNumber
            );

            reports.push(action.payload);

            return { reports };
        }

        default:
            return state;
    }
}
