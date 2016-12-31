import {Component} from '@angular/core';

import {NavController, ToastController} from 'ionic-angular';
import {SpeedService} from "../../providers/speed-service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  private ip: string;
  private randomStep: number;
  private maxSpeed: number;

  constructor(public navCtrl: NavController, private speedService: SpeedService, private toastCtrl: ToastController) {
    this.ip = 'local.louie';
    this.maxSpeed = speedService.getCurrentMax();
    this.randomStep = speedService.getStep();
  }

  setIP() {
    this.speedService.setIP(this.ip);
    let toast = this.toastCtrl.create({
      message: 'Set IP to ' + this.ip,
      duration: 3000,
      position: 'middle'
    });
    toast.present()
      .catch(err => console.log(err));
  }

  setRandomStep() {
    this.speedService.setStep(this.randomStep)
      .then(step => {
        let toast = this.toastCtrl.create({
          message: 'Random step set to ' + step,
          duration: 3000,
          position: 'middle'
        });
        toast.present()
          .catch(err => console.log(err));
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: err,
          duration: 3000,
          position: 'middle'
        });
        toast.present()
          .catch(err => console.log(err));
      });
  }

  setMax() {
    this.speedService.setCurrentMax(this.maxSpeed)
      .then(newMax => {
        let toast = this.toastCtrl.create({
          message: 'MaxSpeed set to ' + newMax,
          duration: 3000,
          position: 'middle'
        });
        toast.present()
          .catch(err => console.log(err));
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: err,
          duration: 3000,
          position: 'middle'
        });
        toast.present()
          .catch(err => console.log(err));
      })
  }
}
