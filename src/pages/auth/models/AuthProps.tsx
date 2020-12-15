export interface FieldForm {
    value: string
    msgError: string
}

export interface FormManager {
    formSubmited: boolean
}

export interface AuthUser  extends FormManager{
    login: FieldForm
    senha: FieldForm
}

export interface AuthProps {
    login(user: AuthUser): Response;
}


