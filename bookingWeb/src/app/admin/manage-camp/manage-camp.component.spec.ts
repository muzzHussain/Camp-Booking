import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCampComponent } from './manage-camp.component';

describe('ManageCampComponent', () => {
  let component: ManageCampComponent;
  let fixture: ComponentFixture<ManageCampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCampComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
