import {Router} from 'express';

class Base {
    private _router: Router;

    constructor() {
        this.router = Router();
    }

    get router(): Router {
        return this._router;
    }

    set router(value: Router) {
        this._router = value;
    }

    public initializeRoutes() {
    }

}


export default Base;