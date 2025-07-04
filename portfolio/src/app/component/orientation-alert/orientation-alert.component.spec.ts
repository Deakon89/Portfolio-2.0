import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientationAlertComponent } from './orientation-alert.component';

describe('OrientationAlertComponent', () => {
  let component: OrientationAlertComponent;
  let fixture: ComponentFixture<OrientationAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrientationAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrientationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
