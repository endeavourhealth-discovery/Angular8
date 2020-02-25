import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatWrapperComponent } from './mat-wrapper.component';

describe('MatWrapperComponent', () => {
  let component: MatWrapperComponent;
  let fixture: ComponentFixture<MatWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
