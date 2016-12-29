import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private speed: number;

  constructor(public navCtrl: NavController) {
    this.speed = 0;
  }

}
