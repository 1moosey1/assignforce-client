import { Component } from '@angular/core';
// import { AppMaterialModule} from '../app/app-material/app-material.module'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tabs = ['OVERVIEW', 'BATCHES', 'LOCATIONS', 'CURRICULA', 'TRAINERS', 'PROFILE', 'REPORTS', 'SETTINGS'];

  constructor(private router: Router) {}
  ngOnInit() {
    this.router.navigate(['overview']);
  }

  selectTab(event) {
    console.log(event);
    this.router.navigate([event.tab.textLabel.toLowerCase()]);
  }

  logout() {
    console.log('hello');
  }
}
