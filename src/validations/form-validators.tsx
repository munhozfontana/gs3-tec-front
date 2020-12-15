import {
  CadastroUsuarioModel
} from "../core/models/cadastro-usuario/cadastroUsuarioModel";
import { FieldForm, FieldFormArray } from "../core/models/forms";
import { CadastroUsuarioModelHTTPsend } from "../services/cadastroService";

export class FormValidators {
  static isInvalid(fieldFomr: FieldForm[], FieldFormArray: FieldFormArray[]) {
    
    if(fieldFomr.find((item) => !!item.msgError)){
      return true;
    } 

    if(FieldFormArray.find((item) => !!item.msgError)){
      return true;
    } 
    

    return false;
  }

  static cadastroUsuarioToHTPP(
    form: CadastroUsuarioModel
  ): CadastroUsuarioModelHTTPsend {
    return {
      nome: form.nome.value,
      cpf: form.cpf.value,
      endereco: {
        cep: form.endereco.cep.value,
        logradouro: form.endereco.logradouro.value,
        bairro: form.endereco.bairro.value,
        cidade: form.endereco.cidade.value,
        uf: form.endereco.uf.value,
        complemento: form.endereco.complemento.value,
      },
      telefone: form.telefone.value,
      email: form.email.value,
    } as CadastroUsuarioModelHTTPsend;
  }
  static msgNotEmpty = "Valor não pode ser vazio";
  static msgSelect = "É necessário inserir um novo(a)";

  static setMsgSelect = (value: string): string => {
    return `${FormValidators.msgSelect} ${value}`;
  };

  static invalidField = (valueField: String) => {
    if (valueField?.length === 0) {
      return FormValidators.msgNotEmpty;
    }

    if (valueField === null) {
      return FormValidators.msgNotEmpty;
    }

    if (valueField === undefined) {
      return FormValidators.msgNotEmpty;
    }
  };

  static invalidFieldBetween = (
    valueField: number,
    min: number,
    max: number
  ) => {
    FormValidators.invalidFieldMax(valueField, max);
    FormValidators.invalidFieldMin(valueField, min);
    return false;
  };

  static invalidFieldMax = (valueField: number, max: number) => {
    if (valueField > max) {
      return `Valor não pode ser maior que ${max}`;
    }
  };

  static invalidFieldMin = (valueField: number, min: number) => {
    if (valueField < min) {
      return `Valor não pode ser maior que ${min}`;
    }
  };

  static invalidLengthMax = (valueField: string, max: number) => {
    if (valueField.length > max) {
      return `Valor não pode ser maior que ${max}`;
    }
  };

  static invalidLengthdMin = (valueField: string, min: number) => {
    if (valueField.length < min) {
      return `Valor não pode ser menor que ${min}`;
    }
  };


  static justNumbers = (value: string): string => {
    return value.replace(/\D/g, '')
  }

}
