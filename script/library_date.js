function formatDate(date, dateType, isUnix = false) {

    let newDate;

    if (isUnix) {
        const milliseconds = date * 1000;
        newDate = new Date(milliseconds);
    }
    else {
        newDate = new Date(date);
    }

    const daysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    //currentDate.toLocaleString() + currentDate.toLocaleString("nl-NL", {weekday: "long"})
    //let dateFormattedLong = weekday[newDate.getDay()] + ' ' + newDate.getDate() + ' ' + month[newDate.getMonth()] + ' ' + newDate.getFullYear() + ',' + newDate.getHours() + 'h' + newDate.getMinutes();

    let datePart = ("0" + newDate.getDate()).slice(-2) + '-' + ("0" + (newDate.getMonth() + 1)).slice(-2) + '-' + newDate.getFullYear();
    let datePartUS = newDate.getFullYear() + '-' + ("0" + (newDate.getMonth() + 1)).slice(-2) + '-' + ("0" + newDate.getDate()).slice(-2);
    let timePart = ("0" + newDate.getHours()).slice(-2) + ':' + ("0" + newDate.getMinutes()).slice(-2) + ':' + ("0" + newDate.getSeconds()).slice(-2);
    let dayShort = daysShort[newDate.getDay()];
    let daymonthPart = ("0" + newDate.getDate()).slice(-2) + '/' + ("0" + (newDate.getMonth() + 1)).slice(-2);

    switch (dateType) {
        case 'date':
            return datePart;
        case 'date_us':
            return datePartUS;
        case 'time':
            return timePart;
        case 'day_short':
            return dayShort;
        case 'day_month':
            return daymonthPart;
        case 'date_full_us':
            return datePartUS + ' ' + timePart;
        default:
            return datePart + ' ' + timePart;
    }
}

function formatDate2(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function formatDate3(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    if (hours.length < 2)
        hours = '0' + hours;
    if (minutes.length < 2)
        minutes = '0' + minutes;
    if (seconds.length < 2)
        seconds = '0' + seconds;

    return year + '-' + month + '-' + day + " " + hours + ":" + minutes + ":" + seconds;
}