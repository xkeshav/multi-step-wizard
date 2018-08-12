import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppConstants } from '../../app.constants';
import { RegistrationService } from '../registration.service';
import { WorkflowService } from '../../layout/workflow/workflow.service';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-unlock',
  templateUrl: './unlock.html'
})
export class UnlockComponent implements OnInit {
  unlockForm: FormGroup;
  formSubmitted: boolean = false;
  currentStep: number;

  contentHeading: string = 'A first password is created to access the system.';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private regService: RegistrationService,
    private workflowService: WorkflowService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.route.data.subscribe(data => {
      this.currentStep = data.step;
    });
  }

  goToNext() {
    this.unlock();
  }

  private unlock() {
    this.formSubmitted = true;
    const payload = this.unlockForm.value;
    this.regService
      .verify(payload)
      .finally(() => (this.formSubmitted = false))
      .subscribe(res => {
        this.toastr.success(res.message, AppConstants.INIT.ACCESS_VERIFY_TITLE);
        this.unlockForm.reset();
        this.workflowService.validateStep(this.currentStep, true);
      });
  }

  private buildForm() {
    this.unlockForm = this.fb.group({
      name: [''],
      password: ['', Validators.required]
    });
  }

  get password() {
    return this.unlockForm.get('password');
  }
}
