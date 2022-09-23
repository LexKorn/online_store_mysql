import {makeAutoObservable} from 'mobx';

export default class UserStore {
    constructor() {
       this._isAuth = false;
       this._isUser = {};
       this._isRole = {};
       makeAutoObservable(this); 
    };

    setIsAuth(bool) {
        this._isAuth = bool;
    };

    setIsUser(bool) {
        this._isUser = bool;
    };

    setUser(bool) {
        this._isRole = bool;
    };


    get isAuth() {
        return this._isAuth;
    };

    get isUser() {
        return this._isUser;
    };

    get isRole() {
        return this._isRole;
    };
};