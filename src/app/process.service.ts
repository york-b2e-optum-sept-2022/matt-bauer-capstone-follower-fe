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


  constructor(private httpService: HttpService) {
    this.getAllProcesses()
  }

  getAllProcesses() {
    this.httpService.getAllProcesses().pipe(first()).subscribe({
        next: list => {
          this.$surveyList.next(list)
        },
        error: err => {
        }
      }
    )
  }

  createFinishedProcess(survey: IFinishedProcess) {
    this.httpService.createFinishedProcess(survey).pipe(first()).subscribe({
        next: value => {},
        error: err => {}
      }
    )
  }
}
