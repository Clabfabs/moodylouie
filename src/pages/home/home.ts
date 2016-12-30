import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SpeedService} from "../../providers/speed-service";
import {ToastController} from 'ionic-angular';
import {Platform} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private speed: number;
  private log: string[];
  private random: boolean;
  private interval: any;
  private showLog: boolean;
  private minimum: number;
  private maximum: number;

  constructor(public navCtrl: NavController, private speedService: SpeedService, public platform: Platform, public toastCtrl: ToastController) {
    this.speed = 0;
    this.log = [];
    this.random = false;
    this.showLog = false;
    this.minimum = 0;
    this.maximum = 100;
  }

  changeSpeed(speed) {
    console.log(speed);
    this.speedService.setSpeed(speed)
      .then(response => {
        console.log('response', response);
        this.log.unshift('Success: ' + response.toString());
      })
      .catch(error => {
        console.log('Error: ', error);
        this.log.unshift('Error: ' + error.toString());
        // if (this.random) {
        //   if (this.interval) {
        //     clearInterval(this.interval);
        //     console.log("cleared interval");
        //   }
        //   this.random = false;
        // }
        let toast = this.toastCtrl.create({
          message: 'Error: ' + error,
          duration: 3000,
          position: 'bottom'
        });
        toast.present()
          .catch(err => console.log(err));
      })
  }

  triggerRandom(event) {
    console.log(event);
    if (this.random) {
      if (this.interval) {
        clearInterval(this.interval);
        console.log("cleared interval");
      }
      this.random = false;
    } else {
      let that = this;
      this.interval = setInterval(function () {
        let newSpeed = that.speed;
        if (newSpeed < 0) newSpeed = Math.round(Math.random() * that.maximum * 0.2);
        else if (newSpeed > that.maximum * 0.8) {
          newSpeed = Math.min(that.speed + Math.round(Math.random() * that.maximum * 0.3 - that.maximum * 0.2), that.maximum);
        } else if (newSpeed < that.maximum * 0.2) {
          newSpeed = Math.min(that.speed + Math.round(Math.random() * that.maximum * 0.3 - that.maximum * 0.1), that.maximum);
        } else newSpeed = Math.min(that.speed + Math.round(Math.random() * that.maximum * 0.3 - that.maximum * 0.15), that.maximum);
        that.speed = newSpeed;
        that.changeSpeed(that.speed);
      }, 3000);
      this.random = true;
    }
  }

}
