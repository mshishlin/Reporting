import { Quarter } from "./Quarter";

export interface Report {
    quarter: Quarter;

    // I. ВНЕОБОРОТНЫЕ АКТИВЫ
    intangibleAssets: number;
    researchAndDevelopmentResults: number;
    intangibleSearchAssets: number;
    tangibleSearchAssets: number;
    mainAssets: number;
    profitableInvestmentInMaterialAssets: number;
    financialInvestments: number;
    defferedTaxAssets: number;
    otherNonCurrentAssets: number;
    totalsForSectionOne: number;

    // II. ОБОРОТНЫЕ АКТИВЫ
    stocks: number;
    valueAddedTaxOnAcquiredValues: number;
    receivables: number;
    financialInvestmentsExcludingCashEquivalents: number;
    cashAndCashEquivalents: number;
    otherCurrentAssets: number;
    totalsForSectionTwo: number;

    // БАЛАНС
    balans: number;
}
