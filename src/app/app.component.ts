import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Events, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Bilar',
      url: '/app/tabs/(cars:cars)',
      icon: 'car'
    },
    {
      title: 'Bokningar',
      url: '/app/tabs/(schedule:schedule)',
      icon: 'calendar'
    },
    {
      title: 'Kunder',
      url: '/app/tabs/(speakers:speakers)',
      icon: 'contacts'
    }
  ];
  loggedIn = false;

  constructor(
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  selectTab(index: number, fallbackUrl: string) {
    const tabs = document.querySelector('ion-tabs');
    let promise: Promise<any> = null;
    if (tabs) {
      promise = tabs.componentOnReady();
      promise.then(() => {
        return tabs.select(index);
      });
    } else {
      promise = this.navigate(fallbackUrl);
    }
    return promise.then(() => {
      return this.menu.toggle();
    });
  }

  navigate(url: string) {
    return this.router.navigateByUrl(url);
  }

  logout() {
    this.userData.logout().then(() => {
      return this.navigate('/app/tabs/(cars:cars)');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', 'false');
    this.router.navigateByUrl('/tutorial');
  }
}
