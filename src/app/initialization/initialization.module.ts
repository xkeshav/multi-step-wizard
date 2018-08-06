import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UnlockComponent } from './unlock/unlock.component';
import { OrganizationComponent } from './organization/organization.component';
import { AdminComponent } from './admin/admin.component';
import { EmailComponent } from './setting/email.component';
import { SummaryComponent } from './summary/summary.component';

import { InitializationService } from './initialization.service';
import { InitializationRoutes } from './initialization.routing';
import { AgreementComponent } from './agreement/agreement.component';
import { WaitingDirective } from '../directives/waiting.directive';
import { WaitingComponent } from '../directives/waiting.component';
import { InitGuardService } from '../guards/init-guard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InitializationRoutes),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    UnlockComponent,
    OrganizationComponent,
    AdminComponent,
    EmailComponent,
    AgreementComponent,
    SummaryComponent,
    WaitingComponent,
    WaitingDirective
  ],
  providers: [InitializationService, InitGuardService],
  entryComponents: [WaitingComponent]
})
export class InitializationModule {}
