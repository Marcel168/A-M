import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgGanttEditorModule } from 'ng-gantt';

import { GanttComponent } from './gantt.component';

describe('GanttComponent', () => {
  let component: GanttComponent;
  let fixture: ComponentFixture<GanttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgGanttEditorModule.forRoot()
      ],
      declarations: [ GanttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
