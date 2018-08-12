import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegistrationService } from '../registration.service';
import { WorkflowService } from '../../layout/workflow/workflow.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.html'
})
export class SummaryComponent implements OnInit {
  organizationData: any;
  adminData: any;
  emailData: any;

  constructor(
    private router: Router,
    private regService: RegistrationService,
    private workflowService: WorkflowService
  ) {}

  ngOnInit() {}

  goToLogin() {
    this.workflowService.resetSteps();
    setTimeout(() => {
      this.router.navigate(['/authentication/login'], { replaceUrl: true });
    });
  }
}
