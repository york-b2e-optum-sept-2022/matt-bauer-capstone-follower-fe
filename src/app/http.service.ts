import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProcess} from "./_Interfaces/IProcess";
import {IFinishedProcess} from "./_Interfaces/IFinishedProcess";
import {IJwtObject} from "./_Interfaces/IJwtObject";
import {v4 as uuidv4} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  jwt: string = ""

  constructor(private httpClient: HttpClient) { }

  getAllProcesses(): Observable<IProcess[]>{
    return this.httpClient.get("http://localhost:8080/api/process"
    ) as Observable<IProcess[]>
  }

  createFinishedProcess(survey: IFinishedProcess) :Observable<IFinishedProcess> {
      return this.httpClient.post("http://localhost:8080/api/response", survey
      )as Observable<IFinishedProcess>
  }

  startNewSurvey() :Observable<IJwtObject> {
    //TODO get UUID
    return this.httpClient.post("http://localhost:8080/api/response/start" , uuidv4()) as Observable<IJwtObject>
  }


}
