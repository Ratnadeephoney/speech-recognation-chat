import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudiocallPageRoutingModule } from './audiocall-routing.module';

import { AudiocallPage } from './audiocall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudiocallPageRoutingModule
  ],
  declarations: [AudiocallPage]
})
export class AudiocallPageModule {}
