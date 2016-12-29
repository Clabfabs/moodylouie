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
  private log: string[];

  constructor(public navCtrl: NavController, public speedService: SpeedService, public platform: Platform) {
    this.speed = 0;
    this.log = [];
  }

  changeSpeed(speed) {
    console.log(speed);
    this.speedService.setSpeed(speed)
      .then(response => {
        console.log('response', response);
        this.log.unshift('Success: ' + response.toString());
      })
      .catch(error => {
        console.log('Error: ', error.toString());
        this.log.unshift('Error: ' + error.toString());
        if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('windows')) {
          Toast.show('Error: ' + error, '5000', 'bottom').subscribe(
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
