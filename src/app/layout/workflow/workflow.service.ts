import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

import { STEPS, NAVBAR } from './workflow.model';

@Injectable()
export class WorkflowService {
  private workflow = Array.from({ length: STEPS.length }, (_, i) => ({
    step: i + 1,
    name: STEPS[i],
    valid: false
  }));

  initSource: BehaviorSubject<{}> = new BehaviorSubject<{}>(this.workflow[0]);

  private navbarList: any;

  constructor(private router: Router) {
    this.navbarList = NAVBAR.map((nb, i) => ({ step: i + 1, ...nb, done: false }));
  }

  getCurrentState() {
    return this.initSource.asObservable();
  }

  getWorkflow() {
    return Observable.of(this.workflow);
  }

  setCurrentState(step: number = 0, what: boolean = false) {
    let findingState = this.workflow.find(wf => wf.step === step);
    const nextState = Object.assign({}, findingState, { valid: what });
    this.initSource.next(nextState);
  }

  async validateStep(step: number, move: boolean = false) {
    // If the state is found, set the valid field to true
    this.workflow.map(wf => {
      if (wf.step === step) {
        wf.valid = true;
      }
    });
    await this.updateNavbarList(step);
    if (move) {
      this.navigateToStep(step + 1);
    }
  }

  getNavbarList() {
    return this.navbarList;
  }

  updateNavbarList(step: number) {
    this.navbarList.map(nb => {
      if (nb.step === step) {
        nb.done = true;
      }
    });
  }

  navigateToStep(step: number) {
    const navItem = this.navbarList.find(nb => nb.step === step);
    this.setCurrentState(step); // This is must to change exit and cancel button
    this.router.navigate([`/init/${navItem.link}`], { skipLocationChange: true });
  }

  resetSteps() {
    // Reset all the steps in the Workflow to be invalid
    this.workflow.map(wf => (wf.valid = false));
    this.navbarList.map(nb => (nb.done = false));
    this.setCurrentState(1);
  }
}
