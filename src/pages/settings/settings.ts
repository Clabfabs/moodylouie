import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {SpeedService} from "../../providers/speed-service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  private ip: string;

  constructor(public navCtrl: NavController, private speedService: SpeedService) {
    this.ip = 'local.louie';
  }

  setIP() {
    this.speedService.setIP(this.ip);
  }
}
