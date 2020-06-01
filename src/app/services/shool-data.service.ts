import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,HttpParams} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root',
})
export class ShoolDataService {
  private REST_API_SERVER = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {
  }



  public GetAllSchools() {
    return this.httpClient.get(this.REST_API_SERVER + 'api/schools');
  }

  public CreateSchool(modal) {
    return this.httpClient.post(this.REST_API_SERVER + 'api/schools', modal);
  }

  public UpdateSchool(modal) {
    return this.httpClient.put(this.REST_API_SERVER + 'api/schools', modal);
  }

  public DeleteSchool(id) {
    return this.httpClient.delete(this.REST_API_SERVER + 'api/schools/' + id);
  }


}
