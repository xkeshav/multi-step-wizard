import { Routes } from '@angular/router';

import { UnlockComponent } from './unlock/unlock.component';
import { OrganizationComponent } from './organization/organization.component';
import { AdminComponent } from './admin/admin.component';
import { EmailComponent } from './setting/email.component';
import { SummaryComponent } from './summary/summary.component';
import { AgreementComponent } from './agreement/agreement.component';
import { InitGuard } from '../guards';

export const InitializationRoutes: Routes = [
  {
    path: '',
    canActivate: [InitGuard],
    children: [
      { path: 'unlock', component: UnlockComponent, data: { step: 1 } },
      {
        path: 'organization',
        component: OrganizationComponent,
        data: { step: 2 }
      },
      {
        path: 'admin',
        component: AdminComponent,
        data: { step: 3 }
      },
      {
        path: 'email',
        component: EmailComponent,
        data: { step: 4 }
      },
      {
        path: 'eula',
        component: AgreementComponent,
        data: { step: 5 }
      },
      { path: 'summary', component: SummaryComponent, data: { step: 6 } },
      { path: '', redirectTo: 'unlock', pathMatch: 'full' },
      { path: '**', component: UnlockComponent, data: { step: 1 } }
    ]
  }
];
