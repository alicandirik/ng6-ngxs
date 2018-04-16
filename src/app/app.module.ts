import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NGXS_PLUGINS, NgxsModule} from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NaviSidebarComponent } from './navigation/navi-sidebar/navi-sidebar.component';
import { NaviHeaderComponent } from './navigation/navi-header/navi-header.component';
import { LoginComponent } from './auth/login/login.component';

import {RouterState} from './state/router.state';
import {AppState} from './state/app.state';

import {environment} from '../environments/environment';
import {AuthService} from './auth/services/auth.service';
import {UiService} from './shared/services/ui-service';
import { ConfirmationPopupComponent } from './shared/popups/confirmation-popup/confirmation-popup.component';
import {AuthorizationGuard} from './auth/guards/authorization.guard';
import {AuthenticationGuard} from './auth/guards/authentication.guard';
import {logoutPlugin} from './plugins/logout-plugin';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    NaviSidebarComponent,
    NaviHeaderComponent,
    ConfirmationPopupComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    NgxsModule.forRoot([RouterState, AppState]),
    NgxsStoragePluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    AuthService,
    UiService,
    AuthenticationGuard,
    AuthorizationGuard,
    { provide: NGXS_PLUGINS, useValue: logoutPlugin, multi: true }
  ],
  entryComponents: [
    ConfirmationPopupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
