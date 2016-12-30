import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the SpeedService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SpeedService {
    private url: string;

    constructor(public http: Http) {
        this.url = 'http://louie.local/custom?speed='
    }

    setSpeed(speed) {
        return new Promise((resolve, reject) => {
            this.http.get(this.url + speed)
                .map(res => res.json())
                .subscribe(
                    function onSuccess(response) {
                      resolve(response)
                    },
                    function onError(error) {
                      reject(error)
                    },
                    function onFinish() {}
                )
        })
    }

}
