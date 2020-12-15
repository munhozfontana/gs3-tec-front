import { makeAutoObservable } from "mobx"



class Loading {
    load: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    change(newSate: boolean) {
        this.load = newSate
    }

}

export const LoadingStore = new Loading()
