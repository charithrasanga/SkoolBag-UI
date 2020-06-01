import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSchoolDialogComponent } from './new-school-dialog.component';

describe('NewSchoolDialogComponent', () => {
  let component: NewSchoolDialogComponent;
  let fixture: ComponentFixture<NewSchoolDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSchoolDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSchoolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
