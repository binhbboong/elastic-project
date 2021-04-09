import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private httpClient: HttpClient) { }

  login(email, password) {
    const url = `https://reqres.in/api/login`;
    const params = {
      email,
      password
    };
    return this.httpClient.post(url, params);
  }

  getTopCountry(form) {
    const url = `${environment.api_url}api/covid/top`;
    return this.httpClient.post(url, form);
  }

  getListCountry() {
    const url = `${environment.api_url}api/covid/list-countries`;
    return this.httpClient.get(url);
  }

  getDetailCountry(form) {
    const url = `${environment.api_url}api/covid/countries-by-date`;
    return this.httpClient.post(url, form);
  }
}
