import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from 'src/app/core/interfaces/country';

// The URL for the REST API that provides country data
const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    return this.httpClient.get(`${API_URL}/all`).pipe(
      map((data: any) => {
        return data.map((country: any) => ({
          name: country.name.common,
          capital: country.capital,
          capitalWikipediaUrl: `https://en.wikipedia.org/wiki/${country.capital}`,
          region: country.region,
          subregion: country.subregion,
          population: country.population,
          area: country.area,
          flag: `https://flagsapi.com/${country.cca2}/flat/64.png`,
          flags: country.flags,
          unMember: country.unMember,
          startOfWeek: country.startOfWeek,
          currencies: country.currencies,
          googleMapUrl: country.maps.googleMaps,
          timezones: country.timezones,
          borders: country.borders,
          languages: country.languages,
          idd: country.idd,
          code: country.cca3
        }));
      }),
      catchError(_ => of([]))
    )
  }

  getCountryByCode(code: string): Observable<Country | null> {
    return this.httpClient.get<any>(`${API_URL}/alpha/${code}`).pipe(
      map((data: any) => {
        if (data && data.length > 0) {
          const item = data[0];
          return {
            name: item.name.common,
            capital: item.capital,
            capitalWikipediaUrl: `https://en.wikipedia.org/wiki/${item.capital}`,
            region: item.region,
            subregion: item.subregion,
            population: item.population,
            area: item.area,
            flag: `https://flagsapi.com/${item.cca2}/flat/64.png`,
            flags: item.flags,
            unMember: item.unMember,
            startOfWeek: item.startOfWeek,
            currencies: item.currencies,
            googleMapUrl: item.maps.googleMaps,
            timezones: item.timezones,
            borders: item.borders,
            languages: item.languages,
            idd: item.idd,
            code: item.cca3
          };
        } else {
          // If data is null or empty array, country was not found
          return null;
        }
      }),
      catchError(_ => of(null))
    );
  }

}
