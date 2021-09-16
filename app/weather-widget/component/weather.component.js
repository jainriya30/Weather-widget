"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
//import { Store, select } from '@ngrx/store';
var weather_service_1 = require('../service/weather.service');
var weather_1 = require('../model/weather');
var constants_1 = require('../constants/constants');
var WeatherComponent = (function () {
    function WeatherComponent(service) {
        this.service = service;
        this.weather = new weather_1.Weather(null, null, null, null, null);
        this.locname = new weather_1.locName(null, null);
        this.currentSpeedUnit = "kph";
        this.currentLocation = " ";
        this.icons = new Skycons({ "color": "#FFF" });
    }
    WeatherComponent.prototype.ngOnInit = function () {
        this.getCurrentLocation();
    };
    WeatherComponent.prototype.getCurrentLocation = function () {
        var _this = this;
        this.service.getCurrentLocation()
            .subscribe(function (position) {
            _this.pos = position;
            _this.getCurrentWeather();
            _this.getLocationName();
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.getCurrentWeather = function () {
        var _this = this;
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (weather) {
            _this.weather.temp = weather["main"]["temp"],
                _this.weather.wind = weather["wind"]["speed"],
                _this.weather.humidity = weather["main"]["humidity"],
                _this.weather.summary = weather["weather"]["0"]["main"],
                _this.weather.icon = weather["weather"]["0"]["main"];
            console.log("weather : ", _this.weather);
            _this.setIcon();
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.getLocationName = function () {
        var _this = this;
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (location) {
            console.log(location);
            _this.locname.state = location["results"][0]["locations"][0]["adminArea3"];
            _this.locname.street = location["results"][0]["locations"][0]["street"];
            console.log("name = ", _this.locname);
            //console.log("name = ", this.currentLocation); 
        });
    };
    WeatherComponent.prototype.toggleUnits = function () {
        this.toggleSpeedUnits();
    };
    WeatherComponent.prototype.toggleSpeedUnits = function () {
        if (this.currentSpeedUnit == "kph") {
            this.currentSpeedUnit = "mph";
        }
        else {
            this.currentSpeedUnit = "kph";
        }
    };
    WeatherComponent.prototype.setIcon = function () {
        this.icons.add("icon", this.weather.icon);
        this.icons.play();
    };
    WeatherComponent.prototype.setStyles = function () {
        if (this.weather.icon) {
            return constants_1.WEATHER_COLORS["default"];
        }
        else {
            return constants_1.WEATHER_COLORS["default"];
        }
    };
    WeatherComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'weather-widget',
            templateUrl: 'weather.component.html',
            styleUrls: ['weather.component.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], WeatherComponent);
    return WeatherComponent;
}());
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component.js.map