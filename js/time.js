function getTime(timer) {
    var time = new Date(timer);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var dates = time.getDate();
    var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var day = time.getDay();
    var h = time.getHours();
    h = h < 10 ? '0' + h : h;
    var m = time.getMinutes();
    m = m < 10 ? '0' + m : m;
    var s = time.getSeconds();
    s = s < 10 ? '0' + s : s;
    return year + '-' + month + '-' + dates + '创建';
}
console.log(getTime());