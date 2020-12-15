import { FieldForm, FieldFormArray, FormManager } from "../forms";

export interface CadastroUsuarioModel extends FormManager {
  nome: FieldForm;
  cpf: FieldForm;
  endereco: {
    cep: FieldForm;
    logradouro: FieldForm;
    bairro: FieldForm;
    cidade: FieldForm;
    uf: FieldForm;
    complemento: FieldForm;
  };
  telefone: FieldFormArray;
  email: FieldFormArray;
}

