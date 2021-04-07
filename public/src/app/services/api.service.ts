import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    const url = `http://localhost:3000/api/covid/top`;
    return this.httpClient.post(url, form);
  }

  getListCountry() {
    const url = `http://localhost:3000/api/covid/list-countries`;
    return this.httpClient.get(url);
  }
}