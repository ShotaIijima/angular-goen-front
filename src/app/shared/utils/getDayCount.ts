export function getDayCount(year, month) {
    return new Date(year, month, 0).getDate();
}