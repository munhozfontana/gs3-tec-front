
export class CadastroService {

    static post = async (cadastroUsuarioModel: CadastroUsuarioModelHTTPsend): Promise<Boolean> => {
        const result = await fetch(
            `http://localhost/cadastro/usuario`,
            { method: "POST", body: JSON.stringify(cadastroUsuarioModel) }
        );
        return result.ok
    }

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
  }
  