import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LocalStorageKey } from '@shared/LocalStorageKey';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './apps/index/index.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PortalModule } from '@angular/cdk/portal';
import { SettingsComponent } from './apps/settings/settings.component';
import { ErrorCollectorService } from '@shared/services/error-collector.service';
import { XflyEtherClockComponent } from '@shared/components/xfly-ether-clock/xfly-ether-clock.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FirebaseModule } from '@shared/firebase.module';

const MatModules = [
  MatFormFieldModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSidenavModule,
  MatCheckboxModule,
  FlexLayoutModule,
  MatMenuModule,
  MatBottomSheetModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatCardModule,
  PortalModule
]

const components = [
  AppComponent,
  IndexComponent,
  SettingsComponent,
]

/** 是否關閉動畫的判定 */
function prefersReducedMotion(): boolean {
  const mediaQueryList = window.matchMedia("(prefers-reduced-motion)");
  const localStorageAnimState = JSON.parse(localStorage.getItem(LocalStorageKey.disableAnimation) || 'null')
  return localStorageAnimState !== null ? localStorageAnimState : mediaQueryList.matches;
}

/** i18n路徑 */
function ImportTranslateJson(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule.withConfig({
      disableAnimations: prefersReducedMotion()
    }),
    ...MatModules,
    AppRoutingModule,
    XflyEtherClockComponent,
    HttpClientModule,
    FirebaseModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (ImportTranslateJson),
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately'
    }),

  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorCollectorService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
