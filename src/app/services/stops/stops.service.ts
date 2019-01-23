import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchStopResponse } from '../../inerfaces/search-stop.response';
import { StopInfo } from '../../models/StopInfo';
import { StopSchedule } from '../../models/StopSchedule';

export const API_URL = 'https://myttc.ca';

@Injectable({
  providedIn: 'root'
})
export class StopsService {
  constructor(private readonly httpClient: HttpClient) {}

  searchById(stopId: string): Observable<StopInfo[]> {
    // use jsonp method here to bypass CORS error
    return this.httpClient
      .jsonp<SearchStopResponse>(`${API_URL}/${stopId}.json`, 'callback')
      .pipe(map(this.toStopInfo));
  }

  private toStopInfo(response: SearchStopResponse): StopInfo[] {
    const result = [];

    response.stops.forEach(stop => {
      if (stop.routes.length) {
        return stop.routes.forEach(route => {
          const schedules = route.stop_times.map(
            stopTime => new StopSchedule(route.name, stopTime.departure_time)
          );
          result.push(new StopInfo(stop.name, schedules));
        });
      }
    });

    return result;
  }
}
