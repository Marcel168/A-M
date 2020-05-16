import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaComponent } from './elimina.component';

describe('EliminaComponent', () => {
  let component: EliminaComponent;
  let fixture: ComponentFixture<EliminaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
