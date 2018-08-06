import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

import { WorkflowService } from '../../layout/workflow/workflow.service';
import { InitializationService } from '../initialization.service';
import { AppConstants } from '../../app.constants';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
  private readonly pattern_email: RegExp = AppConstants.REGEX.EMAIL;
  private readonly pattern_domain: RegExp = AppConstants.REGEX.DOMAIN;
  private readonly pattern_port: RegExp = AppConstants.REGEX.PORT;
  private readonly pattern_retry: RegExp = AppConstants.REGEX.RETRY;
  emailSettingForm: FormGroup;
  currentStep: number;
  formSubmitted: boolean;
  testEmailSubmitted: boolean;
  isEmailSent: boolean;
  isEmailError: boolean;
  successMsg: string;
  errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
    private initService: InitializationService,
    private toastr: ToastrService
  ) {
    this.formSubmitted = false;
    this.testEmailSubmitted = false;
    this.isEmailSent = false;
    this.isEmailError = false;
    this.buildForm();
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.currentStep = data.step;
    });
  }

  onTestMailChange() {
    this.isEmailSent = false;
    this.isEmailError = false;
  }

  goToNext() {
    this.configurationEmailSetting();
  }

  private configurationEmailSetting() {
    if (this.emailSettingForm.valid) {
      this.formSubmitted = true;
      this.initService
        .configureEmail(this.getPayLoad())
        .finally(() => (this.formSubmitted = false))
        .subscribe(message => {
          this.toastr.success(message, AppConstants.INIT.CONFIGURE_EMAIL_TITLE);
          this.emailSettingForm.reset();
          this.workflowService.validateStep(this.currentStep, true);
        });
    }
  }

  skipToNext() {
    this.workflowService.validateStep(this.currentStep, true);
  }
  private buildForm() {
    this.emailSettingForm = this.fb.group({
      protocol: [null, Validators.required],
      host: [null, [Validators.required, Validators.pattern(this.pattern_domain)]],
      port: [null, [Validators.required, Validators.pattern(this.pattern_port)]],
      username: [null, [Validators.required, Validators.pattern(this.pattern_email)]],
      password: [null, Validators.required],
      retryCount: [null, [Validators.required, Validators.pattern(this.pattern_retry)]],
      testMailId: [null, [Validators.required, Validators.pattern(this.pattern_email)]]
    });
  }

  private getPayLoad() {
    const { password, ...payload } = this.emailSettingForm.value; // remove password form transform object
    const transformPayload = { password, ...this.transformCase(payload) }; // add password to final payload object
    return transformPayload;
  }

  //TODO: generic util service to convert object value into lowercase.
  private transformCase(payload) {
    return (<any>Object)
      .entries(payload)
      .map(([k, v]) => [k, String(v).toLowerCase()])
      .reduce((obj, [k, v]) => Object.assign(obj, { [k]: v }), {});
  }

  get protocol() {
    return this.emailSettingForm.get('protocol');
  }
  get host() {
    return this.emailSettingForm.get('host');
  }
  get port() {
    return this.emailSettingForm.get('port');
  }
  get username() {
    return this.emailSettingForm.get('username');
  }
  get password() {
    return this.emailSettingForm.get('password');
  }
  get retryCount() {
    return this.emailSettingForm.get('retryCount');
  }
  get testMailId() {
    return this.emailSettingForm.get('testMailId');
  }
}
