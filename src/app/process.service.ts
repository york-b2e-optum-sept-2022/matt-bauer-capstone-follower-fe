import { Injectable } from '@angular/core';
import {BehaviorSubject, first} from "rxjs";
import {IProcess} from "./_Interfaces/IProcess";
import {HttpService} from "./http.service";
import {IFinishedProcess} from "./_Interfaces/IFinishedProcess";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  $surveyList = new BehaviorSubject<IProcess[]>([])
  jwt: string | null = null
  $httpErrorMessage = new BehaviorSubject<string | null>(null);


  constructor(private httpService: HttpService) {
    this.getAllProcesses()
  }

  getAllProcesses() {
    this.httpService.getAllProcesses().pipe(first()).subscribe({
        next: list => {
          this.$surveyList.next(list)
        },
        error: err => {
          this.$httpErrorMessage.next("An unknown error occurred, please try again later")
        }
      }
    )
  }

  createFinishedProcess(surveyResponse: IFinishedProcess) {
    if (this.jwt)
    this.httpService.createFinishedProcess(
      {
      jwt: this.jwt,
      response: surveyResponse
      }
    ).pipe(first()).subscribe({
        next: value => {this.jwt = null},
        error: err => {
          if(err.status === 401){
            this.$httpErrorMessage.next("Unable to submit response due to security concern, please restart survey.")
            return
          }
          this.$httpErrorMessage.next("An unknown error occurred, please try again later")

        }
      }
    )
  }

  startNewSurvey(){
    this.httpService.startNewSurvey().pipe(first()).subscribe({
        next: jwt => {this.jwt = jwt.jwt
        console.log("Here is jwt in front end: ", this.jwt)},
        error: err => {console.error(err)
          this.$httpErrorMessage.next("An unknown error occurred, please try again later")
        }
      }
    )
  }

cancelSurvey(){
    if(this.jwt)
  this.httpService.cancelSurvey(this.jwt).pipe(first()).subscribe({
      next: value => {this.jwt = null},
      error: err => {
        this.$httpErrorMessage.next("An unknown error occurred, please try again later")
      }
    }
  )
}

}
