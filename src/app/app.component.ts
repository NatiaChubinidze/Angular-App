import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-angular-app';
  @Input() toggleInterface = false;
  @Input() userInfo = {};
  getData($event) {
    this.userInfo = $event;
  }
}
