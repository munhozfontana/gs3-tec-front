
export class ViaCepService {

    static get = async (cep: String): Promise<ViaCepModelHTTPResponse> => {
        const result = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );
        return await result.json()
    }

}


export interface ViaCepModelHTTPResponse {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string,
    senha: string
}