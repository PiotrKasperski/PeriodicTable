import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicTableEditDialogComponent } from './periodic-table-edit-dialog.component';

describe('PeriodicTableEditDialogComponent', () => {
  let component: PeriodicTableEditDialogComponent;
  let fixture: ComponentFixture<PeriodicTableEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodicTableEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodicTableEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
