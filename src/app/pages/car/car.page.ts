import { Component, OnInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage {
  session: any;

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        const sessionId = this.route.snapshot.paramMap.get('carId');
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    });
  }

}
