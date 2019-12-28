import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopapComponent } from './popap.component';

describe('PopapComponent', () => {
  let component: PopapComponent;
  let fixture: ComponentFixture<PopapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
