import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CitySearchBarComponent } from './city-search-bar.component';

describe('CitySearchBarComponent', () => {
  let component: CitySearchBarComponent;
  let fixture: ComponentFixture<CitySearchBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CitySearchBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitySearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
