import { Routes } from '@angular/router';

import { InitGuard } from '../guards';
import { UnlockComponent } from './unlock/unlock.component';
import { PersonalComponent } from './personal/personal.component';
import { OfficialComponent } from './official/official.component';
import { ContactComponent } from './contact/contact.component';
import { AgreementComponent } from './agreement/agreement.component';
import { SummaryComponent } from './summary/summary.component';

export const InitializationRoutes: Routes = [
  {
    path: '',
    canActivate: [InitGuard],
    children: [
      {
        path: 'unlock',
        component: UnlockComponent,
        data: { step: 1 }
      },
      {
        path: 'personal',
        component: PersonalComponent,
        data: { step: 2 }
      },
      {
        path: 'official',
        component: OfficialComponent,
        data: { step: 3 }
      },
      {
        path: 'contact',
        component: ContactComponent,
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
