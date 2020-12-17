import { AuthStore } from "../store/storeAuth";

export class LoginService {
  static getLogin = async (nome: String, senha: String): Promise<Boolean> => {
    const result = fetch(`http://localhost:8080/login`, {
      method: "POST",
      body: JSON.stringify({ nome, senha }),
    });
    const res = await result;
    if (res) {
      AuthStore.setToken(res.headers.get('Content-Language') || "");
    }
    return await res.ok;
  };
}
