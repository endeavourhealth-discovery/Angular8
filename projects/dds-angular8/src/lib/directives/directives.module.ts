import {NgModule} from '@angular/core';
import {MatReadonlyDirective} from './mat-readonly.directive';

@NgModule({
  declarations: [
    MatReadonlyDirective
  ],
  exports: [
    MatReadonlyDirective
  ]
})
export class DirectivesModule { }
