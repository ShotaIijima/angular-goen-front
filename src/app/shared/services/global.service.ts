import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { popDataBus } from '../utils/popDataBus';

@Injectable()
export class GlobalService {

    private dataSource = new Subject<DataSourceClass>();

    constructor() {
        /*Object.defineProperty(window, '_globalService', {
            value        : this,
            writable     : true,
            enumerable   : true,
            configurable : true
        });
        window.addEventListener("popstate", {
            gs: "4hy",
            handleEvent: (e) => {
                
            }
        });*/
    }

    data$ = this.dataSource.asObservable();

    public dataBusChanged(ev, value) {
        this.dataSource.next({
            ev: ev,
            value: value
        })
    }
}

export class DataSourceClass {
    ev: string;
    value: any
}
