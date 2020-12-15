export class LoginService {

    static getLogin = async (login: String, senha: String): Promise<Boolean> => {
        const result = await fetch(
            `http://localhost/login/${login}/${senha}`
        );
        return result.ok
    }

}