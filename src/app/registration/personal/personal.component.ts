import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AppConstants } from '../../app.constants';
import { RegistrationService } from '../registration.service';
import { WorkflowService } from '../../layout/workflow/workflow.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.html'
})
export class PersonalComponent implements OnInit {
  private readonly pattern_domain: RegExp = AppConstants.REGEX.DOMAIN;
  formSubmitted: boolean = false;
  personalForm: FormGroup;
  currentStep: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
    private regService: RegistrationService,
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
    const payload = this.personalForm.value;
    this.regService
      .registerTenant(payload)
      .finally(() => (this.formSubmitted = false))
      .subscribe(result => {
        this.toastr.success(result.message, AppConstants.INIT.REGISTER_TENANT_TITLE);
        this.personalForm.reset();
        this.workflowService.validateStep(this.currentStep, true);
      });
  }

  private buildForm() {
    this.personalForm = this.fb.group({
      name: ['', Validators.required],
      domain: ['', [Validators.required, Validators.pattern(this.pattern_domain)]],
      address: ['', Validators.required]
    });
  }

  get name() {
    return this.personalForm.get('name');
  }

  get domain() {
    return this.personalForm.get('domain');
  }

  get address() {
    return this.personalForm.get('address');
  }
}
