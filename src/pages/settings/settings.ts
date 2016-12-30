import {Component} from '@angular/core';

import {NavController, ToastController} from 'ionic-angular';
import {SpeedService} from "../../providers/speed-service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  private ip: string;

  constructor(public navCtrl: NavController, private speedService: SpeedService, private toastCtrl: ToastController) {
    this.ip = 'local.louie';
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
}
