import { AuthStore } from "../store/storeAuth";

export class CadastroService {
  static post = async (
    cadastroUsuarioModel: CadastroUsuarioModelHTTPsend
  ): Promise<Boolean> => {
    cadastroUsuarioModel.senha = "senhaQueDeveSerAleatoraMasBack";
    const result = await fetch(`http://localhost:8080/cadastro-resource`, {
      method: "POST",
      body: JSON.stringify(cadastroUsuarioModel),
      headers: { "Content-Language": AuthStore.getToken(), "Content-Type": "application/json" },
    });

    return result.ok;
  };
}

export interface CadastroUsuarioModelHTTPsend {
  nome: string;
  cpf: string;
  endereco: {
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    complemento: string;
  };
  telefone: string[];
  email: string[];
  senha: string;
}
