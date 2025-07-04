import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTickerComponent } from './tech-ticker.component';

describe('TechTickerComponent', () => {
  let component: TechTickerComponent;
  let fixture: ComponentFixture<TechTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechTickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
