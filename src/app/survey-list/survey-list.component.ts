import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProcess} from "../_Interfaces/IProcess";
import {ProcessService} from "../process.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit, OnDestroy {

  surveyList: IProcess[] = []
  selectedSurvey: IProcess | null = null
  onDestroy$ = new Subject();
  isSurveyFinished: boolean = false


  constructor(private processService: ProcessService) {
    this.processService.$surveyList.pipe(takeUntil(this.onDestroy$)).subscribe(
      list => {
        this.surveyList = list
      }
    )
  }

  ngOnInit(): void {
  }


  ngOnDestroy() {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }

  onViewSurveyClick(survey: IProcess) {
    this.selectedSurvey = survey
    this.processService.startNewSurvey()
  }

  onSurveyCancelCLick() {
    this.selectedSurvey = null
  }

  isSurveyComplete(isComplete: boolean) {
    this.isSurveyFinished = isComplete
  }
}

