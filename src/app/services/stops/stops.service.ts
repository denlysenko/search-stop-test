import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

export const API_URL = 'https://myttc.ca';

@Injectable({
  providedIn: 'root'
})
export class StopsService {
  constructor(private readonly httpClient: HttpClient) {}

  searchById(stopId: string): Observable<any> {
    // use jsonp method here to bypass CORS error
    return this.httpClient.jsonp(`${API_URL}/${stopId}.json`, 'callback');
  }
}
