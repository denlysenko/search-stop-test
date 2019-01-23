import { HttpBackend, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchStopResponse } from '../../inerfaces/search-stop.response';
import { StopInfo } from '../../models/StopInfo';
import { StopSchedule } from '../../models/StopSchedule';
import { API_URL, StopsService } from './stops.service';

describe('StopsService', () => {
  let service: StopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StopsService,
        { provide: JsonpClientBackend, useExisting: HttpBackend }
      ]
    });

    service = TestBed.get(StopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchById()', () => {
    let ID: string;
    let response: SearchStopResponse;

    beforeEach(() => {
      ID = 'search_id';
      response = {
        time: 1548240190,
        uri: 'finch_station',
        name: 'Finch Station',
        stops: [
          {
            name: 'Finch Station Bishop Entrance',
            agency: 'Toronto Transit Commission',
            routes: [],
            uri: 'finch_station_bishop_entrance'
          },
          {
            name: 'Finch Station Subway Platform',
            agency: 'Toronto Transit Commission',
            routes: [
              {
                name: 'Yonge-University-Spadina Subway',
                stop_times: [
                  {
                    service_id: 1,
                    shape:
                      'Yonge-University-Spadina Subway To Downsview Station',
                    departure_timestamp: 1548241389,
                    departure_time: '6:03a'
                  }
                ],
                uri: 'yonge-university-spadina_subway',
                route_group_id: '1'
              }
            ],
            uri: 'finch_station_subway_platform'
          }
        ]
      };
    });

    it('should send correct request', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);

      service.searchById(ID).subscribe();

      const req = http.expectOne(
        request => request.url === `${API_URL}/${ID}.json`
      );
      expect(req.request.method).toBe('JSONP');
      req.flush(response);
      tick();
    }));

    it('should remove elements with an empty routes', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);

      service.searchById(ID).subscribe(res => {
        expect(res[0].stopSchedules.length).toEqual(1);
      });

      const req = http.expectOne(
        request => request.url === `${API_URL}/${ID}.json`
      );
      expect(req.request.method).toBe('JSONP');
      req.flush(response);
      tick();
    }));

    it('should convert to StopInfo/StopSchedule models', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const stopSchedules = new StopSchedule(
        'Yonge-University-Spadina Subway',
        '6:03a'
      );
      const stopInfo = new StopInfo('Finch Station Subway Platform', [
        stopSchedules
      ]);

      service.searchById(ID).subscribe(res => {
        expect(res[0]).toEqual(stopInfo);
      });

      const req = http.expectOne(
        request => request.url === `${API_URL}/${ID}.json`
      );
      expect(req.request.method).toBe('JSONP');
      req.flush(response);
      tick();
    }));

    it('should return error if request failed', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const error = { message: 'not found' };

      service.searchById(ID).subscribe(
        () => {},
        err => {
          expect(err.error.status).toEqual(404);
          expect(err.error.error).toEqual(error);
        }
      );

      const req = http.expectOne(
        request => request.url === `${API_URL}/${ID}.json`
      );
      expect(req.request.method).toBe('JSONP');
      req.error(new HttpErrorResponse({ error, status: 404 }));
      tick();
    }));
  });
});
