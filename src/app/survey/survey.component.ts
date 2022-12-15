import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IProcess} from "../_Interfaces/IProcess";
import {ProcessService} from "../process.service";
import {Subject, takeUntil} from "rxjs";
import {IResponse} from "../_Interfaces/IResponse";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit, OnDestroy {
  @Output () onSurveySubmit = new EventEmitter<boolean>()
  @Input() survey!: IProcess | null
  selectedSurvey!: IProcess
  onDestroy$ = new Subject()
  questionIndex: number = 0;
  responseList: IResponse[] = []
  surveyComplete: boolean = false
  httpErrorMessage: string | null = null

  constructor(private processService: ProcessService) {
    this.processService.$surveyList.pipe(takeUntil(this.onDestroy$)).subscribe(
      list => {
        let selectedIndex = list.length - 1
        if (!this.survey)
          this.selectedSurvey = list[selectedIndex]
        else this.selectedSurvey = this.survey
        if (this.selectedSurvey.questionList)
          this.selectedSurvey.questionList.sort((a, b) => a.index - b.index)
      }
    )
    this.processService.$httpErrorMessage.pipe(takeUntil(this.onDestroy$)).subscribe(
      message => this.httpErrorMessage = message
    )
  }

  ngOnInit(): void {
    if (this.survey) {
      this.selectedSurvey = this.survey
      this.selectedSurvey.questionList.sort((a, b) => a.index - b.index)
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
  }

  onDirectionChange(sign: string): void {
    if (sign === '<')
      this.questionIndex--
    if (sign === '>')
      this.questionIndex++
    if (sign === 'Submit')
      this.createFinishedProcess()
  }

  addResponse(response: IResponse): void {
        let index = this.responseList.findIndex(resp => resp.prompt === response.prompt)
    if(index >= 0)
        this.responseList[index] = response
    else this.responseList.push(response)
      }

  createFinishedProcess(): void {
    this.processService.createFinishedProcess(
      {
        id: -1,
        surveyTitle: this.selectedSurvey.title,
        dateFinished: new Date(),
        responseList: this.responseList
      }
    )
    this.surveyComplete = true
    this.onSurveySubmit.emit(true)
  }

}
