import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StopInfo } from '../../models/StopInfo';
import { StopsService } from '../../services/stops/stops.service';

@Component({
  selector: 'app-stop-page',
  templateUrl: './stop-page.component.html',
  styleUrls: ['./stop-page.component.scss']
})
export class StopPageComponent implements OnInit {
  displayedColumns = ['lineName', 'departureTime'];

  stops$: Observable<StopInfo[]>;
  error$ = new Subject<boolean>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly stopsService: StopsService
  ) {}

  ngOnInit() {
    const stopId = this.route.snapshot.params.stopId;
    this.stops$ = this.stopsService
      .searchById(stopId)
      .pipe(catchError(() => (this.error$.next(true), of(null))));
  }
}
