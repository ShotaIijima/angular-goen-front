export function fixDateFormat(_date: string) {
    var arr = _date.split('T');
    return arr[0] + ' ' + arr[1].split('.')[0];
}