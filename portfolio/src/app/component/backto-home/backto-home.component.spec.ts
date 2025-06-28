import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktoHomeComponent } from './backto-home.component';

describe('BacktoHomeComponent', () => {
  let component: BacktoHomeComponent;
  let fixture: ComponentFixture<BacktoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacktoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacktoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
