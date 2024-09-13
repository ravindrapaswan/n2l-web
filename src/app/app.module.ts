import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Added Modules
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgOtpInputModule } from  'ng-otp-input';
import { DatePipe } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './FrontComponents/about/about.component';
import { FAQComponent } from './FrontComponents/faq/faq.component';
import { HeaderComponent } from './Core/header/header.component';
import { FooterComponent } from './Core/footer/footer.component';
import { MainHeaderComponent } from './Core/main-header/main-header.component';
import { MainFooterComponent } from './Core/main-footer/main-footer.component';
import { HomeComponent } from './FrontComponents/home/home.component';
import { SidebarComponent } from './Core/sidebar/sidebar.component';
import { MaterialModule } from './Material/material/material.module';
import { RegisterComponent } from './FrontComponents/register/register.component';
import { ForgetPasswordComponent } from './FrontComponents/forget-password/forget-password.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ContactComponent } from './FrontComponents/contact/contact.component';
import { PrivacyPolicyComponent } from './FrontComponents/privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FAQComponent,
    HeaderComponent,
    FooterComponent,
    MainHeaderComponent,
    MainFooterComponent,
    HomeComponent,
    SidebarComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ContactComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxExtendedPdfViewerModule,
    NgOtpInputModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token')
        }
      }
    })

  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
