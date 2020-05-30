import { MENU_ITEM } from '../../pages/menu';

export function popDataBus(e) {
    var _path = location.pathname.split('/').pop();
    var path_obj = MENU_ITEM.filter(menu => menu.path === _path)[0];
    console.log(path_obj)
    e.target._globalService.dataBusChanged('isActived', path_obj);
}