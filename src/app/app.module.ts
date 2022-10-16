import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IndexComponent } from './apps/index/index.component';
import { MatListModule } from '@angular/material/list';
import { TodoComponent } from './apps/todo/todo.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SettingsComponent } from './apps/settings/settings.component';
import { AboutComponent } from './apps/about/about.component';
import { EviatComponent } from './apps/eviat/eviat.component';
import { NotepadComponent } from './apps/notepad/notepad.component';

const MatModules = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  MatBadgeModule,
  MatTooltipModule,
  MatBottomSheetModule,
  DragDropModule,
  FlexLayoutModule,
  FormsModule,
  MatCardModule,
  ReactiveFormsModule
]

const components = [
  AppComponent,
  IndexComponent,
  TodoComponent
]
@NgModule({
  declarations: [
    ...components,
    SettingsComponent,
    AboutComponent,
    EviatComponent,
    NotepadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...MatModules,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
