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
  private randomTimeInterval: number;

  constructor(public navCtrl: NavController, private speedService: SpeedService, private toastCtrl: ToastController) {
    this.ip = '192.168.4.1';
    this.maxSpeed = speedService.getCurrentMax();
    this.randomStep = speedService.getStep();
    this.randomTimeInterval = speedService.getRandomTimeInterval()
  }

  setIP() {
    this.speedService.setIP(this.ip);
    this.makeToast('Set IP to ' + this.ip);
  }

  setRandomStep() {
    this.speedService.setStep(this.randomStep)
      .then(step => this.makeToast('Random step set to ' + step))
      .catch(err => this.makeToast(err))

  }

  setMax() {
    this.speedService.setCurrentMax(this.maxSpeed)
      .then(newMax => this.makeToast('MaxSpeed set to ' + newMax))
      .catch(err => this.makeToast(err))
  }

  setRandomTimeInterval() {
    this.speedService.setRandomTimeInterval(this.randomTimeInterval)
      .then(interval => this.makeToast('Random time interval set to ' + interval))
      .catch(err => this.makeToast(err))
  }

  private makeToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });
    toast.present()
      .catch(err => console.log(err));
  }
}
