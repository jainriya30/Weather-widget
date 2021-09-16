import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div class= " container">
            <div class="col-xs-4">
                <weather-widget> </weather-widget>
            </div>
        </div>
    `,
    styles: [ `
        .container {
            padding-top: 5rem;
        }
    `]
})
export class AppComponent { }