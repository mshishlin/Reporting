import { ValidationRules } from './ValidationRules';
import { InputProps } from '../components/ui/Input/Input';

export const validateControl = (value: string, validation?: ValidationRules): boolean => {
    if (!validation) {
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = value.trim().length > 0;
    }

    if (validation.minLength) {
        isValid = isValid && value.trim().length > validation.minLength;
    }

    if (validation.minValue) {
        isValid = isValid && +value >= validation.minValue;
    }

    if (validation.maxValue) {
        isValid = isValid && +value <= validation.maxValue;
    }

    if (validation.checkAmountInputs) {
        isValid = isValid && +value === validation.checkAmount;
    }

    return isValid;
};

export const validateForm = (formControls: { [propName: string]: InputProps }) => {
    let isValid = true;

    (Object.keys(formControls) as Array<keyof typeof formControls>).forEach((controlName) => {
        if (formControls[controlName].shouldValidate) {
            isValid = isValid && !!formControls[controlName].valid;
        }
    });

    return isValid;
};
