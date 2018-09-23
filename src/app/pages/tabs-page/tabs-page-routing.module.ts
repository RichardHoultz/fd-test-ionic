import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs-page';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
import { SpeakerListPage } from '../speaker-list/speaker-list';
import { CarsPage } from '../cars/cars.page';
import { CarPage } from '../car/car.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // tab one
      {
        path: 'cars',
        component: CarsPage,
        outlet: 'cars'
      },
      {
        path: 'car/:carId',
        component: CarPage,
        outlet: 'cars'
      },
      // tab two
      {
        path: 'schedule',
        component: SchedulePage,
        outlet: 'schedule'
      },
      {
        path: 'session/:sessionId',
        component: SessionDetailPage,
        outlet: 'schedule'
      },
      // tab three
      {
        path: 'speakers',
        component: SpeakerListPage,
        outlet: 'speakers'
      },
      {
        path: 'session/:sessionId',
        component: SessionDetailPage,
        outlet: 'speakers'
      },
      {
        path: 'speaker-details/:speakerId',
        component: SpeakerDetailPage,
        outlet: 'speakers'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
