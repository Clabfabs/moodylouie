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
  private ip: string;

  constructor(public http: Http) {
    this.ip = 'louie.local';
  }

  setSpeed(speed) {
    console.log(this.ip);
    return new Promise((resolve, reject) => {
      let url = 'http://' + this.ip + '/custom?speed=' + speed;
      console.log('URL: ' + url);
      this.http.get(url)
        .map(res => res.json())
        .subscribe(
          function onSuccess(response) {
            resolve(response)
          },
          function onError(error) {
            reject(error)
          },
          function onFinish() {
          }
        )
    })
  }

  setIP(ip) {
    console.log('Set IP to ' + ip);
    this.ip = ip;
  }

}
