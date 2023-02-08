import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule, APP_NAME } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule, USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { FirebaseSettings } from './FirebaseSettings';
import { SyncIndicateComponent } from './components/sync-indicate/sync-indicate.component';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(FirebaseSettings.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [
    // ... Existing Providers
    { provide: USE_DEVICE_LANGUAGE, useValue: true },
    { provide: APP_NAME, useValue: 'xFly PWA'}
  ],
  declarations: [
    SyncIndicateComponent
  ],
  exports: [
    SyncIndicateComponent
  ]
})
export class FirebaseModule {
  static forChild(): ModuleWithProviders<FirebaseModule> {
    return {
      ngModule: FirebaseModule,
    }
  }
}
