import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SpeedService} from "../../providers/speed-service";
import {ToastController} from 'ionic-angular';
import {Platform} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SpeedService]
})
export class HomePage {
  private speed: number;
  private log: string[];
  private random: boolean;
  private interval: any;
  private showLog: boolean;

  constructor(public navCtrl: NavController, public speedService: SpeedService, public platform: Platform, public toastCtrl: ToastController) {
    this.speed = 0;
    this.log = [];
    this.random = false;
    this.showLog = false;
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
        if (this.random) {
          if (this.interval) {
            clearInterval(this.interval);
            console.log("cleared interval");
          }
          this.random = false;
        }
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
        if (newSpeed < 0) newSpeed = Math.round(Math.random() * 50);
        else newSpeed = Math.min(that.speed + Math.round(Math.random() * 40 - 20), 50);
        that.speed = newSpeed;
        that.changeSpeed(that.speed);
      }, 5000);
      this.random = true;
    }
  }

}
