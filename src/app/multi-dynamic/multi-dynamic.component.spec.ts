import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDynamicComponent } from './multi-dynamic.component';

describe('MultiDynamicComponent', () => {
  let component: MultiDynamicComponent;
  let fixture: ComponentFixture<MultiDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
