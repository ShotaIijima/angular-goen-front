export function calculate_age(birthday) {
    var bArr = birthday.split('-');
    var today = new Date();
    var age = today.getFullYear() - parseFloat(bArr[0]);
    var b = Number(bArr[1] + adjust_digits(bArr[2], 2));
    var t = Number((today.getMonth() + 1) + adjust_digits(today.getDate(), 2));
    if(t  < b) {
        age--;
    }
    return age;
}

function adjust_digits(num, digit) {
    var no = String(num);
    while(no.length < digit) {
        no = '0' + no;
    }
    return no;
}