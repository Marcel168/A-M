import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminaComponent } from './semina.component';

describe('SeminaComponent', () => {
  let component: SeminaComponent;
  let fixture: ComponentFixture<SeminaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeminaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
