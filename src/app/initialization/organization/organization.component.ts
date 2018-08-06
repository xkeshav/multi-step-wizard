import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { WorkflowService } from '../../layout/workflow/workflow.service';
import { InitializationService } from '../initialization.service';
import { AppConstants } from '../../app.constants';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html'
})
export class OrganizationComponent implements OnInit {
  private readonly pattern_domain: RegExp = AppConstants.REGEX.DOMAIN;
  formSubmitted: boolean = false;
  organizationForm: FormGroup;
  currentStep: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
    private initService: InitializationService,
    private toastr: ToastrService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.currentStep = data.step;
    });
  }

  goToNext() {
    this.registerOrganization();
  }

  private registerOrganization() {
    this.formSubmitted = true;
    const payload = this.organizationForm.value;
    this.initService
      .registerTenant(payload)
      .finally(() => (this.formSubmitted = false))
      .subscribe(result => {
        this.toastr.success(result.message, AppConstants.INIT.REGISTER_TENANT_TITLE);
        this.organizationForm.reset();
        this.workflowService.validateStep(this.currentStep, true);
      });
  }

  private buildForm() {
    this.organizationForm = this.fb.group({
      name: ['', Validators.required],
      domain: ['', [Validators.required, Validators.pattern(this.pattern_domain)]],
      address: ['', Validators.required]
    });
  }

  get name() {
    return this.organizationForm.get('name');
  }

  get domain() {
    return this.organizationForm.get('domain');
  }

  get address() {
    return this.organizationForm.get('address');
  }
}
