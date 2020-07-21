import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import classes from './ReportDetailView.module.scss';
import { Button } from '../../components/ui/Button/Button';
import { InputProps, renderInputs } from '../../components/ui/Input/Input';
import { Report } from '../../models/Report';
import { saveReport } from '../../redux/actions/reportActions';
import { validateControl, validateForm } from '../../validation/validation';

type ReportDetailViewQueryParams = {
    year: string;
    quarterNumber: string;
};

interface ReportDetailViewProps extends RouteComponentProps<ReportDetailViewQueryParams> {
    reports: Report[];
    saveReport: (report: Report) => any;
}

interface ReportDetailViewState {
    formControls: {
        // I. ВНЕОБОРОТНЫЕ АКТИВЫ
        intangibleAssets: InputProps;
        researchAndDevelopmentResults: InputProps;
        intangibleSearchAssets: InputProps;
        tangibleSearchAssets: InputProps;
        mainAssets: InputProps;
        profitableInvestmentInMaterialAssets: InputProps;
        financialInvestments: InputProps;
        defferedTaxAssets: InputProps;
        otherNonCurrentAssets: InputProps;
        totalsForSectionOne: InputProps;

        // II. ОБОРОТНЫЕ АКТИВЫ
        stocks: InputProps;
        valueAddedTaxOnAcquiredValues: InputProps;
        receivables: InputProps;
        financialInvestmentsExcludingCashEquivalents: InputProps;
        cashAndCashEquivalents: InputProps;
        otherCurrentAssets: InputProps;
        totalsForSectionTwo: InputProps;

        // БАЛАНС
        balans: InputProps;
    };
    isFormValid: boolean;
}

class ReportDetailView extends Component<ReportDetailViewProps, ReportDetailViewState> {
    constructor(props: ReportDetailViewProps) {
        super(props);

        const report = props.reports.find(
            (r) => r.quarter.year === +this.props.match.params.year && r.quarter.quarterNumber === +this.props.match.params.quarterNumber
        );

        this.state = {
            formControls: {
                intangibleAssets: this.createFormControl({
                    label: 'Нематериальные активы (1110)',
                    name: 'intangibleAssets',
                    value: report?.intangibleAssets || 0,
                }),
                researchAndDevelopmentResults: this.createFormControl({
                    label: 'Результаты исследований и разработок (1120)',
                    name: 'researchAndDevelopmentResults',
                    value: report?.researchAndDevelopmentResults || 0,
                }),
                intangibleSearchAssets: this.createFormControl({
                    label: 'Нематериальные поисковые активы (1130)',
                    name: 'intangibleSearchAssets',
                    value: report?.intangibleSearchAssets || 0,
                }),
                tangibleSearchAssets: this.createFormControl({
                    label: 'Материальные поисковые активы (1140)',
                    name: 'tangibleSearchAssets',
                    value: report?.tangibleSearchAssets || 0,
                }),
                mainAssets: this.createFormControl({
                    label: 'Основные средства (1150)',
                    name: 'mainAssets',
                    value: report?.mainAssets || 0,
                }),
                profitableInvestmentInMaterialAssets: this.createFormControl({
                    label: 'Доходные вложения в материальные ценности (1160)',
                    name: 'profitableInvestmentInMaterialAssets',
                    value: report?.profitableInvestmentInMaterialAssets || 0,
                }),
                financialInvestments: this.createFormControl({
                    label: 'Финансовые вложения (1170)',
                    name: 'financialInvestments',
                    value: report?.financialInvestments || 0,
                }),
                defferedTaxAssets: this.createFormControl({
                    label: 'Отложенные налоговые активы  (1180)',
                    name: 'defferedTaxAssets',
                    value: report?.defferedTaxAssets || 0,
                }),
                otherNonCurrentAssets: this.createFormControl({
                    label: 'Прочие внеоборотные активы  (1190)',
                    name: 'otherNonCurrentAssets',
                    value: report?.otherNonCurrentAssets || 0,
                }),
                totalsForSectionOne: this.createFormControl({
                    errorMessage: 'Сумма значений в полях (1110 - 1190) не совпадает с введенным значением',
                    label: 'Итоги по разделу I  (1100)',
                    name: 'totalsForSectionOne',
                    shouldValidate: true,
                    valid: true,
                    validation: {
                        checkAmountInputs: [
                            'intangibleAssets',
                            'researchAndDevelopmentResults',
                            'intangibleSearchAssets',
                            'tangibleSearchAssets',
                            'mainAssets',
                            'profitableInvestmentInMaterialAssets',
                            'financialInvestments',
                            'defferedTaxAssets',
                            'otherNonCurrentAssets',
                        ],
                    },
                    value: report?.totalsForSectionOne || 0,
                }),
                stocks: this.createFormControl({
                    label: 'Запасы (1210)',
                    name: 'stocks',
                    value: report?.stocks || 0,
                }),
                valueAddedTaxOnAcquiredValues: this.createFormControl({
                    label: 'Налог на добавленную стоимость по приобретенным ценностям (1220)',
                    name: 'valueAddedTaxOnAcquiredValues',
                    value: report?.valueAddedTaxOnAcquiredValues || 0,
                }),
                receivables: this.createFormControl({
                    label: 'Дебиторская задолженность (1230)',
                    name: 'receivables',
                    value: report?.receivables || 0,
                }),
                financialInvestmentsExcludingCashEquivalents: this.createFormControl({
                    label: 'Финансовые вложения за исключением денежных эквивалентов (1240)',
                    name: 'financialInvestmentsExcludingCashEquivalents',
                    value: report?.financialInvestmentsExcludingCashEquivalents || 0,
                }),
                cashAndCashEquivalents: this.createFormControl({
                    label: 'Денежные средства и денежные эквиваленты (1250)',
                    name: 'cashAndCashEquivalents',
                    value: report?.cashAndCashEquivalents || 0,
                }),
                otherCurrentAssets: this.createFormControl({
                    label: 'Прочие оборотные активы (1260)',
                    name: 'otherCurrentAssets',
                    value: report?.otherCurrentAssets || 0,
                }),
                totalsForSectionTwo: this.createFormControl({
                    errorMessage: 'Сумма значений в полях (1210 - 1260) не совпадает с введенным значением',
                    label: 'Итоги по разделу II (1200)',
                    name: 'totalsForSectionTwo',
                    shouldValidate: true,
                    valid: true,
                    validation: {
                        checkAmountInputs: [
                            'stocks',
                            'valueAddedTaxOnAcquiredValues',
                            'receivables',
                            'financialInvestmentsExcludingCashEquivalents',
                            'cashAndCashEquivalents',
                            'otherCurrentAssets',
                        ],
                    },
                    value: report?.totalsForSectionTwo || 0,
                }),
                balans: this.createFormControl({
                    errorMessage: 'Сумма значений в полях (1100 + 1200) не совпадает с введенным значением',
                    label: 'БАЛАНС (1600)',
                    name: 'balans',
                    shouldValidate: true,
                    valid: true,
                    validation: {
                        checkAmountInputs: ['totalsForSectionOne', 'totalsForSectionTwo'],
                    },
                    value: report?.balans || 0,
                }),
            },
            isFormValid: true,
        };
    }

    createFormControl = (config: any) => {
        return {
            onChange: this.onChangeHandler.bind(this),
            shouldValidate: false,
            type: 'number',
            value: '0',
            ...config,
        };
    };

    calculateInputsSumm(formControls: any, inputNames?: string[]): number {
        let inputsSumm = 0;

        inputNames?.forEach((inputName) => {
            const fC: InputProps = { ...formControls[inputName as keyof typeof formControls] };
            if (fC?.value) {
                inputsSumm += +fC.value;
            }
        });

        return inputsSumm;
    }

    onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const controlName = event.target.name;
        const controlValue = event.target.value;

        const formControls = { ...this.state.formControls };
        const formControl: InputProps = { ...formControls[controlName as keyof typeof formControls] };
        formControl.value = controlValue;
        formControl.touched = true;

        if (controlName === 'balans') {
            formControl.valid = validateControl(controlValue, {
                ...formControl.validation,
                checkAmount: this.calculateInputsSumm(formControls, formControl.validation?.checkAmountInputs),
            });

            formControls[controlName as keyof typeof formControls] = formControl;
        } else if (controlName === 'totalsForSectionOne' || controlName === 'totalsForSectionTwo') {
            formControl.valid = validateControl(controlValue, {
                ...formControl.validation,
                checkAmount: this.calculateInputsSumm(formControls, formControl.validation?.checkAmountInputs),
            });

            formControls[controlName as keyof typeof formControls] = formControl;

            const balans: InputProps = { ...formControls.balans };
            if (balans.validation?.checkAmountInputs?.some((inputName) => inputName === controlName)) {
                balans.valid = validateControl(`${balans.value}`, {
                    ...balans.validation,
                    checkAmount: this.calculateInputsSumm(formControls, balans.validation?.checkAmountInputs),
                });
                balans.touched = true;
            }
            formControls.balans = balans;
        } else {
            formControls[controlName as keyof typeof formControls] = formControl;

            const totalsForSectionOne: InputProps = { ...formControls.totalsForSectionOne };
            if (totalsForSectionOne.validation?.checkAmountInputs?.some((inputName) => inputName === controlName)) {
                totalsForSectionOne.valid = validateControl(`${totalsForSectionOne.value}`, {
                    ...totalsForSectionOne.validation,
                    checkAmount: this.calculateInputsSumm(formControls, totalsForSectionOne.validation?.checkAmountInputs),
                });
                totalsForSectionOne.touched = true;
            }
            formControls.totalsForSectionOne = totalsForSectionOne;

            const totalsForSectionTwo: InputProps = { ...formControls.totalsForSectionTwo };
            if (totalsForSectionTwo.validation?.checkAmountInputs?.some((inputName) => inputName === controlName)) {
                totalsForSectionTwo.valid = validateControl(`${totalsForSectionTwo.value}`, {
                    ...totalsForSectionTwo.validation,
                    checkAmount: this.calculateInputsSumm(formControls, totalsForSectionTwo.validation?.checkAmountInputs),
                });
                totalsForSectionTwo.touched = true;
            }
            formControls.totalsForSectionTwo = totalsForSectionTwo;

            const balans: InputProps = { ...formControls.balans };
            if (balans.validation?.checkAmountInputs?.some((inputName) => inputName === controlName)) {
                balans.valid = validateControl(`${balans.value}`, {
                    ...balans.validation,
                    checkAmount: this.calculateInputsSumm(formControls, balans.validation?.checkAmountInputs),
                });
                balans.touched = true;
            }
            formControls.balans = balans;
        }

        this.setState({ formControls, isFormValid: validateForm(formControls) });
    }

    onSaveHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        const formControls = this.state.formControls;

        const report: Report = {
            quarter: {
                year: +this.props.match.params.year,
                quarterNumber: +this.props.match.params.quarterNumber,
            },
            intangibleAssets: +(formControls.intangibleAssets.value || 0),
            researchAndDevelopmentResults: +(formControls.researchAndDevelopmentResults.value || 0),
            intangibleSearchAssets: +(formControls.intangibleSearchAssets.value || 0),
            tangibleSearchAssets: +(formControls.tangibleSearchAssets.value || 0),
            mainAssets: +(formControls.mainAssets.value || 0),
            profitableInvestmentInMaterialAssets: +(formControls.profitableInvestmentInMaterialAssets.value || 0),
            financialInvestments: +(formControls.financialInvestments.value || 0),
            defferedTaxAssets: +(formControls.defferedTaxAssets.value || 0),
            otherNonCurrentAssets: +(formControls.otherNonCurrentAssets.value || 0),
            totalsForSectionOne: +(formControls.totalsForSectionOne.value || 0),

            stocks: +(formControls.stocks.value || 0),
            valueAddedTaxOnAcquiredValues: +(formControls.valueAddedTaxOnAcquiredValues.value || 0),
            receivables: +(formControls.receivables.value || 0),
            financialInvestmentsExcludingCashEquivalents: +(formControls.financialInvestmentsExcludingCashEquivalents.value || 0),
            cashAndCashEquivalents: +(formControls.cashAndCashEquivalents.value || 0),
            otherCurrentAssets: +(formControls.otherCurrentAssets.value || 0),
            totalsForSectionTwo: +(formControls.totalsForSectionTwo.value || 0),

            balans: +(formControls.balans.value || 0),
        };

        console.log('report to save', report);

        this.props.saveReport(report);

        this.props.history.push('/reportslistview')
    }

    render() {
        const {
            intangibleAssets,
            researchAndDevelopmentResults,
            intangibleSearchAssets,
            tangibleSearchAssets,
            mainAssets,
            profitableInvestmentInMaterialAssets,
            financialInvestments,
            defferedTaxAssets,
            otherNonCurrentAssets,
            totalsForSectionOne,
            stocks,
            valueAddedTaxOnAcquiredValues,
            receivables,
            financialInvestmentsExcludingCashEquivalents,
            cashAndCashEquivalents,
            otherCurrentAssets,
            totalsForSectionTwo,
            balans,
        } = this.state.formControls;

        return (
            <div className={classes.report}>
                <h2>
                    Бухгалтерский баланс за {this.props.match.params.quarterNumber} квартал {this.props.match.params.year} года
                </h2>
                <form className={classes['report-form']}>
                    <div className={classes['fixed-assets']}>
                        <h3>I. Внеоборотные активы</h3>
                        <div className={classes.table}>
                            <div className={classes.column}>
                                {renderInputs({ intangibleAssets, tangibleSearchAssets, financialInvestments, totalsForSectionOne })}
                            </div>
                            <div className={classes.column}>
                                {renderInputs({ researchAndDevelopmentResults, mainAssets, defferedTaxAssets })}
                            </div>
                            <div className={classes.column}>
                                {renderInputs({ intangibleSearchAssets, profitableInvestmentInMaterialAssets, otherNonCurrentAssets })}
                            </div>
                        </div>
                    </div>
                    <div className={classes['current-assets']}>
                        <h3>II. Оборотные активы</h3>
                        <div className={classes.table}>
                            <div className={classes.column}>
                                {renderInputs({ stocks, receivables, cashAndCashEquivalents, totalsForSectionTwo })}
                            </div>
                            <div className={classes.column}>
                                {renderInputs({
                                    valueAddedTaxOnAcquiredValues,
                                    financialInvestmentsExcludingCashEquivalents,
                                    otherCurrentAssets,
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={classes.balans}>{renderInputs({ balans })}</div>
                    <div className={classes['save-button']}>
                        <Button disabled={!this.state.isFormValid} onClick={this.onSaveHandler.bind(this)}>
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        reports: state.reports.reports,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveReport: (report: Report) => dispatch(saveReport(report)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailView);
