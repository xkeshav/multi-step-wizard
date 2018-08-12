import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UnlockComponent } from './unlock/unlock.component';
import { PersonalComponent } from './personal/personal.component';
import { OfficialComponent } from './official/official.component';
import { AgreementComponent } from './agreement/agreement.component';
import { ContactComponent } from './contact/contact.component';
import { SummaryComponent } from './summary/summary.component';

import { WaitingComponent } from '../directives/waiting.component';
import { WaitingDirective } from '../directives/waiting.directive';
import { InitializationRoutes } from './registration.routing';
import { RegistrationService } from './registration.service';
import { InitGuardService } from '../guards/init-guard.service';
import { DisplayPasswordDirective } from '../directives/display-password.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InitializationRoutes),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    UnlockComponent,
    PersonalComponent,
    OfficialComponent,
    ContactComponent,
    AgreementComponent,
    SummaryComponent,
    WaitingComponent,
    WaitingDirective,
    DisplayPasswordDirective
  ],
  providers: [RegistrationService, InitGuardService],
  entryComponents: [WaitingComponent]
})
export class RegistrationModule {}
