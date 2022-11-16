import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IStage} from "../_Interfaces/IStage";
import {IProcess} from "../_Interfaces/IProcess";
import {ProcessService} from "../process.service";
import {IResponse} from "../_Interfaces/IResponse";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Output() sendResponse = new EventEmitter<IResponse>()
  @ Output() changeQuestion = new EventEmitter<string>()
  @Input() question!: IStage
  @Input() survey!: IProcess
  @Input() index!: number
  questionResponse: string | null = null
  blankFieldMessage: string | null = null

  constructor(private processService: ProcessService) {
  }

  ngOnInit(): void {
  }


  deBug() {
    console.log(this.blankFieldMessage)
    console.log(this.questionResponse)
    this.questionResponse = null
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

