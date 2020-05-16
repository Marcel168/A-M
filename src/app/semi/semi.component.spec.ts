import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SemiComponent } from './semi.component';

describe('SemiComponent', () => {
  let component: SemiComponent;
  let fixture: ComponentFixture<SemiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
