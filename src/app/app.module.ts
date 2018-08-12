import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AppRoutes } from './app.routing';
import { WorkflowService } from './layout/workflow/workflow.service';
import { RegistrationService } from './registration/registration.service';

@NgModule({
  declarations: [AppComponent, LayoutComponent, NavbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, { initialNavigation: 'enabled', enableTracing: false }),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      }
    })
  ],
  providers: [WorkflowService, RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
