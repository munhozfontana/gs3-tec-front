import { FieldForm, FormManager } from "../forms";


export interface AuthUser extends FormManager {
    login: FieldForm
    senha: FieldForm
}

export interface AuthProps {
    login(user: AuthUser): Response;
}


