import './polyfills';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


// Main
import { AppComponent } from './app.component';

// Modules
import { CommunicationModule } from './modules/communication/communication.module';
import { profilesModule } from './modules/profiles/profiles.module';
import { ApplicationModule } from './modules/application/application.module';
import { PaymentModule } from './modules/payment/payment.module';
import { PublicModule } from './modules/public/public.module';
import { SecureModule } from './modules/secure/secure.module';
import { ProviderModule } from './providers/provider.module';

// Services
import { RestfulAPI } from './providers/services/RestfulAPI.service';
import { WebConfig } from './webconfig';
import { ModalService } from './providers/services/modal.service';
import { SocketEcho } from './providers/services/SocketEcho.service';
import { eventEmitterService } from './providers/services/eventEmitter.service'
import { PagingService } from './providers/services/pagination.service';
import { I18nService } from './providers/services/i18n.service';

// Services: Auth
import { AuthGuardService, AuthGuardRouteService } from './providers/guards/auth-guard.service';
import { AuthService } from './providers/guards/auth.service';
import { SharingService } from './providers/guards/sharing.service';

// Theme
import { HeaderComponent } from './theme/layout/header/header.component';
import { BottomComponent } from './theme/layout/bottom/bottom.component';
import { SignupComponent } from './modules/public/signuppage/signup.component';
import { LoginComponent } from './modules/public/loginpage/login.component';
import { FilterPipe } from './providers/common/filter.pipe';

// Services: Common
import { ErrorsHandler } from './providers/common/error-module/error-handler.service';
import { NotificationService } from './providers/services/notification.service';
import { ErrorRoutingModule } from './providers/common/error-module/error-routing.module';
import { ErrorsComponent } from './providers/common/error-module/error/error.component';




// Angular Material
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslatePipe } from './providers/common/translation.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BottomComponent,
    LoginComponent,
    SignupComponent,
    ErrorsComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ErrorRoutingModule,
    CommunicationModule,
    profilesModule,
    ApplicationModule,
    PaymentModule,
    PublicModule,
    SecureModule,
    ProviderModule
  ],
  exports:[],

  providers: [
    RestfulAPI, AuthService, AuthGuardService, AuthGuardRouteService, WebConfig, PagingService,
    ModalService, SharingService, NotificationService, SocketEcho, eventEmitterService, I18nService,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
