import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCountryComponent } from './top-country.component';

describe('TopCountryComponent', () => {
  let component: TopCountryComponent;
  let fixture: ComponentFixture<TopCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
