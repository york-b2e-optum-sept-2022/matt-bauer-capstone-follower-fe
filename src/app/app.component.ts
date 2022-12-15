import { Component } from '@angular/core';
import {ProcessService} from "./process.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'matt-bauer-capstone-follower-fe';
  viewSurveys: boolean = false
  httpErrorMessage: string | null = null

  constructor(private processService: ProcessService) {
    this.processService.$httpErrorMessage.subscribe(
      message => this.httpErrorMessage = message
    )
  }

  viewSurveysClick(): void {
    this.viewSurveys = true
  }
}
