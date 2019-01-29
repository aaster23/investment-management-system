import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDialogComponent } from './manage-dialog.component';

describe('ManageDialogComponent', () => {
  let component: ManageDialogComponent;
  let fixture: ComponentFixture<ManageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
