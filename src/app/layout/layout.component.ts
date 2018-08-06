import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationError, Router, Event } from '@angular/router';

import { WorkflowService } from './workflow/workflow.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  currentStep: number;
  isNavbarInvisible: boolean = false;
  currentWorkflow: {};
  private SUMMARY_URL: string = '/init/summary';
  private LOGIN_URL: string = '/authentication/login';

  ngOnInit() {
    this.getWorkflow();
  }

  stepChecker(step: number) {
    this.currentStep = step;
  }

  constructor(private router: Router, private workflowService: WorkflowService) {
    console.log('constructor: ');
    this.workflowService.setCurrentState(1, true);
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.workflowService.getNavbarList();
        this.checkNavbarVisible(event);
      }

      if (event instanceof NavigationEnd) {
        this.workflowService.getNavbarList();
        this.checkNavbarVisible(event);
      }

      if (event instanceof NavigationError) {
        console.warn(event.error);
      }
    });
  }

  private checkNavbarVisible(event) {
    this.isNavbarInvisible = event.url === this.SUMMARY_URL || event.url === this.LOGIN_URL;
  }

  private getWorkflow() {
    this.workflowService.getWorkflow().subscribe(wf => {
      this.currentWorkflow = wf;
    });
  }
}
