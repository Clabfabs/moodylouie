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
  private step: number;
  private min: number;
  private currentMin: number;
  private max: number;
  private currentMax: number;
  private randomTimeInterval: number;

  constructor(public http: Http) {
    this.ip = 'louie.local';
    this.step = 20;
    this.min = -30;
    this.currentMin = -30;
    this.currentMax = 100;
    this.max = 100;
    this.randomTimeInterval = 1000;
  }

  setSpeed(speed) {
    return new Promise((resolve, reject) => {
      let url = 'http://' + this.ip + '/custom?speed=' + speed;
      console.log('URL: ' + url);
      this.http.get(url)
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

  setStep(step) {
    return new Promise((resolve, reject) => {
      if (0 <= step && step <= this.max * 0.5) {
        this.step = step;
        return resolve(this.step);
      }
      return reject(new Error('Step must be between 0 and ' + this.max*0.5));
    })
  }

  setCurrentMax(max) {
    return new Promise((resolve, reject) => {
      if (0 <= max && max <= this.step * 2 && max <= this.max) {
        this.currentMax = max;
        return resolve(this.currentMax);
      }
      return reject(new Error('Max must be between 0 and Step * 2 (' + this.step*2 + ') and less than ' + this.max + '.'));
    })
  }

  setRandomTimeInterval(interval) {
    return new Promise((resolve, reject) => {
      if (0 <= interval) {
        this.randomTimeInterval = interval;
        return resolve(this.randomTimeInterval);
      }
      return reject(new Error('Random time interval (in ms) must be a positive number'));
    })
  }

  getRandomTimeInterval() {
    return this.randomTimeInterval;
  }

  getMin() {
    return this.min;
  }

  getCurrentMax() {
    return this.currentMax;
  }

  getStep() {
    return this.step;
  }

}
