import { FieldForm, FormManager } from "../forms";

export interface CadastroUsuarioModel extends FormManager {
    nome: FieldForm,
    cpf: FieldForm,
    endereco: {
        cep: FieldForm,
        logradouro: FieldForm,
        bairro: FieldForm,
        cidade: FieldForm,
        uf: FieldForm
    },
    telefone: FieldForm[],
    email: FieldForm[],
}