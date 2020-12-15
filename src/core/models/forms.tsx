export interface FieldForm {
    value: string
    msgError?: string | null | undefined
}
export interface FieldFormArray {
    value: string[]
    msgError: string
}

export interface FormManager {
    formSubmited: boolean
}