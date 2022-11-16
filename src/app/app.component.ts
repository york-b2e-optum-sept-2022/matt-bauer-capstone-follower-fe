import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'matt-bauer-capstone-follower-fe';
  viewSurveys: boolean = false

  viewSurveysClick() {
    this.viewSurveys = true
  }
}
