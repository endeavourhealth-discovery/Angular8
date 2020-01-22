import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[mat-readonly]'
})
export class MatReadonlyDirective {

  constructor(private renderer: Renderer2,
    private element: ElementRef) {
    renderer.addClass(element.nativeElement, 'mat-readonly');
  }

}
