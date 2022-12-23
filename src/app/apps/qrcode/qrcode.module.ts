import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { QrcodeComponent } from './qrcode.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxKjuaModule } from 'ngx-kjua';

const routes: Routes = [{
  path: '',
  component: QrcodeComponent
}];

@NgModule({
  declarations: [QrcodeComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ZXingScannerModule,
    NgxKjuaModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ]
})
export class QrcodeModule { }
