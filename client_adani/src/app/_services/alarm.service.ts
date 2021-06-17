import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(
    private router: Router,
    private http  : HttpClient
  ) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();    
  }
  public get userValue(): User {
    return this.userSubject.value;
}
  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/alarm`);
}
getAllalarmsummary() {
  return this.http.get<any>(`${environment.apiUrl}/alarm/status`);
}
// getAllmngo() {
// return this.http.get<any>(`${environment.apiUrl}/mdata/current`);
// }
delete(id: string) {
  const param={};
  return this.http.put(`${environment.apiUrl}/alarm/${id}`,param)
      .pipe(map(x => {
          // auto logout if the logged in user deleted their own record
          // if (id == this.userValue.id) {
          //     this.logout();
          // }
           return x;
      }));
}
}
