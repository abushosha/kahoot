import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCountriesComponent } from './list-countries.component';

describe('ListCountriesComponent', () => {
  let component: ListCountriesComponent;
  let fixture: ComponentFixture<ListCountriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCountriesComponent]
    });
    fixture = TestBed.createComponent(ListCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
