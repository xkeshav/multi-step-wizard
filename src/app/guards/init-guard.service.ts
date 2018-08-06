import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { InitializationService } from '../initialization/initialization.service';

@Injectable()
export class InitGuardService implements CanActivate {
  constructor(public router: Router, private initService: InitializationService) {}

  canActivate(): Observable<boolean> | boolean {
    return this.initService
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
