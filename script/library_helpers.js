String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

function fadeOutIn(elem, speed, temp) {

    if (!elem.style.opacity) {
        elem.style.opacity = 1;
    } // end if

    var outInterval = setInterval(function() {
        elem.style.opacity -= 0.02;
        if (elem.style.opacity <= 0) {
            elem.innerHTML = '';
            clearInterval(outInterval);
            // getForecast(localStorage.getItem('weather_current_city'), temp);
            var inInterval = setInterval(function() {
                elem.style.opacity = Number(elem.style.opacity)+0.02;
                if (elem.style.opacity >= 1)
                    clearInterval(inInterval);
            }, speed/50 );
        } // end if
    }, speed/50 );

} // end fadeOut()