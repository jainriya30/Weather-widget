import { Injectable } from '@angular/core';
import { Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable' ;
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { FORECAST_KEY,FORECAST_ROOT , GOOGLE_KEY, GOOGLE_ROOT } from '../constants/constants';

@Injectable( )

export class WeatherService { 

    constructor ( private jsonp: Jsonp, private http : Http ) { }

    getCurrentLocation(): Observable<any> {
        if(navigator.geolocation) {
            return Observable.create(observer => {
                navigator.geolocation.getCurrentPosition(pos => { 
                    observer.next(pos);
            } ),
                err => {
                return Observable.throw(err);
            }
            });
             
        } else {
            console.error("");
            return Observable.throw("Geolocation is not available")
        }
    }

    getCurrentWeather(lat: number, long: number)  {
        const queryParams = "?callback=JSONP_CALLBACK";
        
        return this.jsonp.get(`${FORECAST_ROOT}/weather?lat=${lat}&lon=${long}&appid=${FORECAST_KEY}&callback=JSONP_CALLBACK`)
        
        
        .map(data => data.json())
        .catch(err =>  {
            console.error("Unable to get weather data" , err);
            return Observable.throw(err.json())
        });

    }

    getLocationName(lat : number, long  : number) : Observable<any> {
        //const url = GOOGLE_ROOT;
        //const queryParams= "?latlng=" + lat + "," + long + "key=" + GOOGLE_KEY;
        
        return this.http.get(`${GOOGLE_ROOT}?key=${GOOGLE_KEY}&location=${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true`)
            .map(loc => loc.json())
            .catch(err => {
                console.error("Unable to get location ", err);
                return Observable.throw(err);
            });
    }
}