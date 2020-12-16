import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHostDirective } from './directives/section-host.directive';

@NgModule({
  declarations: [SectionHostDirective],
  imports: [
    CommonModule
  ],
  exports: [SectionHostDirective]
})
export class SharedModule { }
