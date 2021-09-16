"use strict";
var Weather = (function () {
    function Weather(temp, summary, wind, humidity, icon) {
        this.temp = temp;
        this.summary = summary;
        this.wind = wind;
        this.humidity = humidity;
        this.icon = icon;
    }
    return Weather;
}());
exports.Weather = Weather;
var locName = (function () {
    function locName(street, state) {
        this.street = street;
        this.state = state;
    }
    return locName;
}());
exports.locName = locName;
//# sourceMappingURL=weather.js.map