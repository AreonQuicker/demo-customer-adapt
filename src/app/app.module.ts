import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomerListPageComponent } from './pages/customer/customer-list-page/customer-list-page.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerSearchComponent } from './components/customer/customer-search/customer-search.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomerCreatePageComponent } from './pages/customer/customer-create-page/customer-create-page.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CustomerUpdatePageComponent } from './pages/customer/customer-update-page/customer-update-page.component';
import { CustomerUpsertComponent } from './components/customer/customer-upsert/customer-upsert.component';
import { BaseComponentDirective } from './common/base/base-component.directive';
import { ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListPageComponent,
    CustomerListComponent,
    CustomerSearchComponent,
    CustomerCreatePageComponent,
    CustomerUpdatePageComponent,
    CustomerUpsertComponent,
    BaseComponentDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxDatatableModule,
    HttpClientModule,
    MatProgressBarModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
