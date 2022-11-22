import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IStage} from "../_Interfaces/IStage";
import {IProcess} from "../_Interfaces/IProcess";
import {IResponse} from "../_Interfaces/IResponse";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  @Output() sendResponse = new EventEmitter<IResponse>()
  @ Output() changeQuestion = new EventEmitter<string>()
  @Input() question!: IStage
  @Input() survey!: IProcess
  @Input() index!: number
  questionResponse: string | null = null
  blankFieldMessage: string | null = null

  constructor() {
  }

  onDirectionClick(sign: string) {
    if (sign === '>' && !this.questionResponse) {
      this.blankFieldMessage = "Please respond to the question"
      return
    }
    if (this.questionResponse)
      this.sendResponse.emit({
        id: -1,
        prompt: this.question.prompt,
        response: this.questionResponse
      })
    this.changeQuestion.emit(sign)
    this.blankFieldMessage = null
  }
}

