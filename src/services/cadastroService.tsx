import { CadastroUsuarioModel } from "../core/models/cadastro-usuario/cadastroUsuarioModel";

export class CadastroService {

    static post = async (cadastroUsuarioModel: CadastroUsuarioModel): Promise<Boolean> => {
        const result = await fetch(
            `http://localhost/cadastro/usuario`,
        );
        return result.ok
    }

}