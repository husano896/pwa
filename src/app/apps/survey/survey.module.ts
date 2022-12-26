import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSliderModule} from '@angular/material/slider';
import { SurveyComponent } from './survey.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: SurveyComponent
}];

@NgModule({
  declarations: [SurveyComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild(routes)
  ]
})
export class SurveyModule { }
