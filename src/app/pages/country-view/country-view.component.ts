import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { Subject, switchMap, takeUntil } from 'rxjs';
import { Country } from 'src/app/core/interfaces/country';
import { CountriesService } from 'src/app/shared/services/countries.service';

@Component({
  selector: 'app-country-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.scss']
})
export class CountryViewComponent implements OnInit, OnDestroy {
  country: Country | null = null;
  isLoading = true;
  error: string | null = null;
  protected countriesService = inject(CountriesService);
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.isLoading = true; 
        this.error = null;
        this.country = null; 

        const countryCode = params.get('code');

        if (countryCode) {
          return this.countriesService.getCountryByCode(countryCode);
        } else {
          this.isLoading = false;
          this.error = 'No country code provided in the URL.';
          return new Subject<Country | null>();
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (countryData) => {
        this.country = countryData; 
        this.isLoading = false;

        if (!countryData && !this.error) {
          this.error = `Country data not found.`;
        }
      },
      error: (err) => {
        console.error('Error fetching country details:', err);
        this.error = err.message || 'Failed to load country data.';
        this.isLoading = false;
      }
    });
  }

  
  getPeopleDensity(): number | null {
    if (this.country && this.country.population && this.country.area) {
      return Math.round(this.country.population / this.country.area);
    }
    return null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}