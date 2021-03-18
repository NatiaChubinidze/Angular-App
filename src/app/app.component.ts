import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-angular-app';
  loggedIn = localStorage.getItem('token');

  ngOnInit() {
    const interval = setInterval(() => {
      //if (this.loggedIn) {
        //clearInterval(interval);
      //} else {
        this.loggedIn = localStorage.getItem('token');
     // }
    }, 1000);
  }
}
