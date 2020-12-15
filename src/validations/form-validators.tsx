export class FormValidators {

    static invalidField = (valueField: String) => {
        const msgNotEmpty = "Valor não pode ser vazio"

        if (valueField?.length === 0) {
            return msgNotEmpty
        }

        if (valueField === null) {
            return msgNotEmpty
        }

        if (valueField === undefined) {
            return msgNotEmpty
        }

        return ""
    }

    static invalidFieldBetween = (valueField: number, min: number, max: number) => {
        FormValidators.invalidFieldMax(valueField, max);
        FormValidators.invalidFieldMin(valueField, min);
        return false;
    }

    static invalidFieldMax = (valueField: number, max: number) => {
        if (valueField > max) {
            return `Valor não pode ser maior que ${max}`;
        }
    }

    static invalidFieldMin = (valueField: number, max: number) => {
        if (valueField > max) {
            return `Valor não pode ser maior que ${max}`;
        }
    }


}