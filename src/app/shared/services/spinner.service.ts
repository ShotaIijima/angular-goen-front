import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
    private loading: boolean = false;
    constructor() {}

    show() {
        this.loading = true;
    }

    hide() {
        this.loading = false;
    }

    getLoading() {
        return this.loading;
    }
}