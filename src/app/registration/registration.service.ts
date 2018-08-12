import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/finally';

@Injectable()
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  checkAccess() {
    return Observable.of([true, false]);
  }
  verify(password): Observable<any> {
    // return this.httpClient.post(`/initialization/verify`, password).map(res => res);
    return Observable.of({ message: 'Verified Successfully.' });
  }

  registerTenant(postdata): Observable<any> {
    // return this.httpClient.post(`/initialization/tenant`, postdata);
    return Observable.of({ message: 'Tenant Registered Successfully.' });
  }

  registerAdmin(postdata): Observable<any> {
    // return this.httpClient.post(`/initialization/admin`, postdata).map(res => res);
    return Observable.of({ message: 'Admin Registered Successfully.' });
  }

  configureEmail(postdata): Observable<any> {
    // return this.httpClient.post(`/initialization/config`, postdata).map(res => res);
    return Observable.of({ message: 'Email Configured Successfully.' });
  }

  finishInitialization() {
    return this.httpClient.post(`/initialization/finish`, null).map(res => res);
  }
}
