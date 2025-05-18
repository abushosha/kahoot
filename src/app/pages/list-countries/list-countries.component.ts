import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Country } from 'src/app/core/interfaces/country';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [CountriesService]
})
export class ListCountriesComponent implements OnInit, OnDestroy {
  readonly displayedColumns: string[] = ['flag', 'name', 'capital', 'region', 'population', 'area', 'actions'];
  dataSource = new MatTableDataSource<Country>();
  isLoading = false;
  protected countriesService = inject(CountriesService);
  protected router = inject(Router);
  @ViewChild(MatSort) sort!: MatSort;

  private _matSort: MatSort | undefined;
  @ViewChild(MatSort)
  set matSort(ms: MatSort) {
    this._matSort = ms;
    if (this._matSort) {
      this.dataSource.sort = this._matSort;

    }
  }
  get matSort(): MatSort {
    return this._matSort!;
  }

  private destroy$ = new Subject<void>()


  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.isLoading = true;
    this.countriesService.getAllCountries()
      .pipe(takeUntil(this.destroy$)).subscribe({
        next: (countries) => {
          this.dataSource.data = countries.slice(0, 12);
          console.log('Countries:', countries);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching countries:', err);
          this.isLoading = false;
        }
      });
  }

  viewCountryDetails(country: Country): void {
    console.warn('View country details:', country);
    this.router.navigate(['/countries', country.code]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
