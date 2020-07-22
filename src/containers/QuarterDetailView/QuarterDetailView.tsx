import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import classes from './QuarterDetailView.module.scss';
import { Button } from '../../components/ui/Button/Button';
import { InputProps, renderInputs } from '../../components/ui/Input/Input';
import { Quarter } from '../../models/Quarter';
import { validateControl, validateForm } from '../../validation/validation';
import { saveQuarter } from '../../redux/actions/quarterActions';

type QuarterDetailViewQueryParams = {
    year: string;
    quarterNumber: string;
};

interface QuarterDetailViewProps extends RouteComponentProps<QuarterDetailViewQueryParams> {
    quarters: Quarter[];
    saveQuarter: (oldQuarter: Quarter, newQuarter: Quarter) => any;
}

interface QuarterDetailViewState {
    errorMessage: string;
    formControls: {
        quarterNumber: InputProps;
        year: InputProps;
    };
    isFormValid: boolean;
}

class QuarterDetailView extends Component<QuarterDetailViewProps, QuarterDetailViewState> {
    constructor(props: QuarterDetailViewProps) {
        super(props);

        const yearFromQuery =+this.props.match.params.year;
        const quarterNumberFromQuery = +this.props.match.params.quarterNumber

        const quarter = props.quarters.find(
            (r) => r.year === yearFromQuery && r.quarterNumber === quarterNumberFromQuery
        );

        if (!quarter && (yearFromQuery < 2000 || yearFromQuery > new Date().getFullYear() || quarterNumberFromQuery < 0 || quarterNumberFromQuery > 4)) {
            props.history.push('/quarterlistview');
        }

        this.state = {
            errorMessage: '',
            formControls: {
                year: {
                    errorMessage: `Значение в поле "Год" должно входить в диапазон [2000 .. ${new Date().getFullYear()}]`,
                    label: 'Год',
                    name: 'year',
                    onChange: this.onChangeHandler.bind(this),
                    shouldValidate: true,
                    valid: true,
                    validation: {
                        minValue: 2000,
                        maxValue: new Date().getFullYear(),
                    },
                    value: quarter?.year || 0,
                },
                quarterNumber: {
                    errorMessage: 'Значение в поле "Номер квартала" должно входить в диапазон [1 .. 4]',
                    label: 'Номер квартала',
                    name: 'quarterNumber',
                    onChange: this.onChangeHandler.bind(this),
                    shouldValidate: true,
                    valid: true,
                    validation: {
                        minValue: 1,
                        maxValue: 4,
                    },
                    value: quarter?.quarterNumber || 0,
                },
            },

            isFormValid: !!quarter?.year && !!quarter.quarterNumber,
        };
    }

    onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const controlName = event.target.name;
        const controlValue = event.target.value;

        const formControls = { ...this.state.formControls };
        const formControl = { ...formControls[controlName as keyof typeof formControls] };

        formControl.value = controlValue;
        formControl.touched = true;
        formControl.valid = validateControl(controlValue, formControl.validation);

        formControls[controlName as keyof typeof formControls] = formControl;

        this.setState({ formControls, isFormValid: validateForm(formControls), errorMessage: '' });
    }

    onSaveHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        const oldYear = +this.props.match.params.year;
        const oldQuarterNumber = +this.props.match.params.quarterNumber;

        const newYear = +(this.state.formControls.year.value || 0);
        const newQuarterNumber = +(this.state.formControls.quarterNumber.value || 0);

        if (oldYear === newYear && oldQuarterNumber === newQuarterNumber) {
            this.props.saveQuarter(
                { year: +oldYear, quarterNumber: +oldQuarterNumber },
                { year: +newYear, quarterNumber: +newQuarterNumber }
            );

            this.props.history.push('/quarterlistview');
        } else if (this.props.quarters.some((q) => q.year === newYear && q.quarterNumber === newQuarterNumber)) {
            this.setState({ errorMessage: 'Ошибка сохранения: квартал с таким номером и годом уже существует', isFormValid: false });
        } else {
            this.props.saveQuarter(
                { year: +oldYear, quarterNumber: +oldQuarterNumber },
                { year: +newYear, quarterNumber: +newQuarterNumber }
            );

            this.props.history.push('/quarterlistview');
        }
    }

    render() {
        return (
            <div className={classes.quarter}>
                {this.props.match.params.quarterNumber && this.props.match.params.year ? (
                    <h2>
                        Квартал № {this.props.match.params.quarterNumber} {this.props.match.params.year} года
                    </h2>
                ) : null}

                {this.state.errorMessage ? <span>{this.state.errorMessage}</span> : null}

                <form className={classes['quarter-form']}>{renderInputs(this.state.formControls)}</form>
                <div className={classes['save-button']}>
                    <Button disabled={!this.state.isFormValid} onClick={this.onSaveHandler.bind(this)}>
                        Сохранить
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        quarters: state.quarters.quarters,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveQuarter: (oldQuarter: Quarter, newQuarter: Quarter) => dispatch(saveQuarter(oldQuarter, newQuarter)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuarterDetailView);
