import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegnloginPageRoutingModule } from './regnlogin-routing.module';

import { RegnloginPage } from './regnlogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegnloginPageRoutingModule
  ],
  declarations: [RegnloginPage]
})
export class RegnloginPageModule {}
