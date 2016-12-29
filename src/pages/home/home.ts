import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SpeedService} from "../../providers/speed-service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [SpeedService]
})
export class HomePage {
    private speed: number;
    private imgurl: string;

    constructor(public navCtrl: NavController, public speedService: SpeedService) {
        this.speed = 0;
        this.imgurl = 'https://randomuser.me/api/portraits/men/1.jpg'
    }

    changeSpeed(speed) {
        console.log(speed);
        this.speedService.setSpeed(speed)
            .then(results => {
                console.log('response', results);
                this.imgurl = results[0].picture.large;
            })
            .catch(error => {
                console.log('error', error)
            })
    }

}
