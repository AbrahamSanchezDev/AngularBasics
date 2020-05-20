import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ExpObjModule } from '../models/exp-obj/exp-obj.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonLoaderService {
  private jsonsPath = 'assets/json/';

  constructor(private http: HttpClient) {}

  // getExpObjs(jsonName: string): Observable<ExpObjModule> {
  //   var thePath = this.jsonsPath + jsonName;
  //   return this.http.get<ExpObjModule>(thePath);
  // }
}
