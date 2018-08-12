import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { RegistrationService } from '../registration/registration.service';

@Injectable()
export class InitGuardService implements CanActivate {
  constructor(public router: Router, private regService: RegistrationService) {}

  canActivate(): Observable<boolean> | boolean {
    return this.regService
      .checkAccess()
      .take(1)
      .map((res: any) => {
        if (res) {
          return true;
        } else {
          this.router.navigate(['/authentication']);
          return false;
        }
      });
  }
}
