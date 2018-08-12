import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RegistrationService } from '../registration.service';
import { WorkflowService } from '../../layout/workflow/workflow.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.html',
  styleUrls: ['./agreement.less']
})
export class AgreementComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
    private regService: RegistrationService
  ) {}

  ngOnInit() {}
}
