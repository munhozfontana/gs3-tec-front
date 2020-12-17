import { makeAutoObservable } from "mobx";

class Auth {
    token: string = "";

    constructor() {
        makeAutoObservable(this)
    }

    setToken(newSate: string) {
        this.token = newSate
    }

    getToken( ): string {
       return this.token;
    }

}

export const AuthStore = new Auth()