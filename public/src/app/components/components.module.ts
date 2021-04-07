import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbButtonModule, NbCardModule } from '@nebular/theme';



@NgModule({
  declarations: [ConfirmComponent],
  imports: [
    CommonModule,
    NbCardModule,
    ThemeModule,
    NbButtonModule
  ],
  exports: [ConfirmComponent]

})
export class ComponentsModule { }
