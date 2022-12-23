import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetWeatherComponent } from './widget-weather.component';

describe('WeatherComponent', () => {
  let component: WidgetWeatherComponent;
  let fixture: ComponentFixture<WidgetWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetWeatherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
