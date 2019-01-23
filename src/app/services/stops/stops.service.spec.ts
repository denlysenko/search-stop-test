import { HttpBackend, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

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
    it('should send correct request', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const ID = 'search_id';
      const response = { id: ID };

      service.searchById(ID).subscribe(res => {
        expect(res).toEqual(response);
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
      const ID = 'search_id';
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
