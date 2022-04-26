import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudiocallPage } from './audiocall.page';

const routes: Routes = [
  {
    path: '',
    component: AudiocallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudiocallPageRoutingModule {}
