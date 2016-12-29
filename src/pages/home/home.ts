import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SpeedService} from "../../providers/speed-service";
import {Toast} from 'ionic-native';
import {Platform} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SpeedService]
})
export class HomePage {
  private speed: number;

  constructor(public navCtrl: NavController, public speedService: SpeedService, public platform: Platform) {
    this.speed = 0;
  }

  changeSpeed(speed) {
    console.log(speed);
    this.speedService.setSpeed(speed)
      .then(response => {
        console.log('response', response);

      })
      .catch(error => {
        console.log('Error: ', error.toString());
        if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('windows')) {
          Toast.show('Error: ' + error, '5000', 'center').subscribe(
            toast => {
              console.log('Toast Success', toast);
            },
            error => {
              console.log('Toast Error', error);
            },
            () => {
              console.log('Toast Completed');
            }
          )
        }
      })
  }

}
