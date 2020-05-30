import { conf } from '../../conf';

export function delAuthLocalStorage() {
    localStorage.removeItem(conf["SKEY_IS_MNG"]);
    localStorage.removeItem(conf["SKEY_ISFBLOGIN"]);
    localStorage.removeItem(conf["SKEY_ISFBSIGNIN"]);
}
