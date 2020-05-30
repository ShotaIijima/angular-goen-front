import { conf } from '../../conf';

export function delAllLocalStorage() {
    for (var item in conf) {
        localStorage.removeItem(conf[item]);
    }
}