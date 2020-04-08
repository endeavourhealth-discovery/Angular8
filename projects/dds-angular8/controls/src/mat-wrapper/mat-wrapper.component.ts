import {Component, ElementRef, HostBinding, Input, OnDestroy, Optional, Self, ViewChild} from '@angular/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {NgControl} from '@angular/forms';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'mat-wrapper',
  templateUrl: './mat-wrapper.component.html',
  styleUrls: ['./mat-wrapper.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: MatWrapperComponent}]
})
export class MatWrapperComponent implements OnDestroy, MatFormFieldControl<any> {
  static nextId = 0;

  @HostBinding() id = `concept-definition-${MatWrapperComponent.nextId++}`;
  stateChanges = new Subject<void>();
  private _placeholder: string;
  private _required = false;
  private _disabled = false;
  _value: any;
  errorState = false;
  controlType = 'concept-definition';

  @ViewChild('wrapper', {static: true}) wrapper: ElementRef;

  @Input()
  get value(): any | null {
    return this._value;
  }
  set value(value: any) {
    this._value = value;
    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  get empty() {
    if (!this.wrapper)
      return true;

    return !this.wrapper.nativeElement.innerHTML.replace(/(?=<!--)([\s\S]*?)-->/g, "").trim();
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  get focused(): boolean { return false; }
  set focused(value: boolean) { }

  @HostBinding('attr.aria-describedby') describedBy = '';

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
  }
  constructor(@Optional() @Self() public ngControl: NgControl,
              private fm: FocusMonitor,
              private elRef: ElementRef<HTMLElement>) {
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }
}
