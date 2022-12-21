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

  private hostURL: String = "http://10.110.87.54:8080"

  constructor(private httpClient: HttpClient) {
  }

  getAllProcesses(): Observable<IProcess[]> {
    return this.httpClient.get(this.hostURL + "/api/process"
    ) as Observable<IProcess[]>
  }

  createFinishedProcess(survey: IJwtObject): Observable<IJwtObject> {
    return this.httpClient.post(this.hostURL + "/api/response", survey
    ) as Observable<IJwtObject>
  }

  startNewSurvey(): Observable<{ jwt: string }> {
    return this.httpClient.post(this.hostURL + "/api/response/start", uuidv4()) as Observable<{ jwt: string }>
  }

  cancelSurvey(jwt: string): Observable<Object> {
    return this.httpClient.put(this.hostURL + "/api/response/cancel", jwt)
  }
}
