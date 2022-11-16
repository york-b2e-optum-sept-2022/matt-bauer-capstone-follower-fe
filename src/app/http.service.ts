import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProcess} from "./_Interfaces/IProcess";
import {IFinishedProcess} from "./_Interfaces/IFinishedProcess";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getAllProcesses(): Observable<IProcess[]>{
    return this.httpClient.get("http://localhost:8080/api/process"
    ) as Observable<IProcess[]>
  }

  createFinishedProcess(survey: IFinishedProcess) :Observable<IFinishedProcess> {
      return this.httpClient.post("http://localhost:8080/api/response", survey
      )as Observable<IFinishedProcess>
  }
}
