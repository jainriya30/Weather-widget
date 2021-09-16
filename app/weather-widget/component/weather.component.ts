import {Component , OnInit} from '@angular/core';
import { Observable } from 'rxjs';
//import { Store, select } from '@ngrx/store';
import { WeatherService } from '../service/weather.service';

import { Weather, locName  } from '../model/weather';

import { WEATHER_COLORS} from '../constants/constants'
import { from } from 'core-js/fn/array';

declare var Skycons : any;

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: [ 'weather.component.css'],
    providers: [ WeatherService ]
})

export class WeatherComponent implements OnInit { 
    pos: Position;
    weather = new Weather(null, null, null, null, null); 
    locname = new locName(null,null);
    currentSpeedUnit = "kph";
    currentLocation =" ";
    icons = new Skycons({ "color": "#FFF"});

    constructor( private service: WeatherService ) { }
    
    ngOnInit() {
        this.getCurrentLocation();
    }

    getCurrentLocation( ) {
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position;
                this.getCurrentWeather();
                this.getLocationName();
            },
            err => console.error(err));

    }

    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                this.weather.temp= weather["main"] ["temp"],
                this.weather.wind = weather["wind"] ["speed"],
                this.weather.humidity = weather ["main"] ["humidity"],
		        this.weather.summary = weather ["weather"] ["0"] ["main"],
		        this.weather.icon = weather ["weather"] ["0"] ["main"]
                console.log("weather : ", this.weather);
                this.setIcon();
            },
             err => console.error(err));
    }

    getLocationName() {
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                console.log (location);
                this.locname.state = location ["results"] [0] ["locations"] [0] ["adminArea3"];
                this.locname.street = location ["results"] [0] ["locations"] [0] ["street"];
                console.log("name = ", this.locname);
                //console.log("name = ", this.currentLocation); 
            });
    }

    toggleUnits() {
        this.toggleSpeedUnits();
    }

    toggleSpeedUnits() {
        if (this.currentSpeedUnit == "kph") {
            this.currentSpeedUnit ="mph";
        }else {
            this.currentSpeedUnit = "kph";
        }
    }

    setIcon() {
        this.icons.add("icon", this.weather.icon);
        this.icons.play();
    }

    setStyles() {
        if (this.weather.icon) {
            return WEATHER_COLORS["default"];

        } else {
            return WEATHER_COLORS["default"];
        }
    }
}  