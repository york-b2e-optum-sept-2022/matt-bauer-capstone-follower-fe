import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProcess} from "./_Interfaces/IProcess";
import {IJwtObject} from "./_Interfaces/IJwtObject";
import {v4 as uuidv4} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  getAllProcesses(): Observable<IProcess[]> {
    return this.httpClient.get("http://localhost:8080/api/process"
    ) as Observable<IProcess[]>
  }

  createFinishedProcess(survey: IJwtObject): Observable<IJwtObject> {
    return this.httpClient.post("http://localhost:8080/api/response", survey
    ) as Observable<IJwtObject>
  }

  startNewSurvey(): Observable<{ jwt: string }> {
    return this.httpClient.post("http://localhost:8080/api/response/start", uuidv4()) as Observable<{ jwt: string }>
  }

  cancelSurvey(jwt: string) {
    return this.httpClient.put("http://localhost:8080/api/response/cancel", jwt)
  }
}
