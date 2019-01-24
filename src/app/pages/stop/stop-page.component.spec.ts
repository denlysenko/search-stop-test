import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { StopsService } from '../../services/stops/stops.service';
import { StopPageComponent } from './stop-page.component';

const stopId = 'stop_id';

const activatedRouteStub = {
  snapshot: {
    params: {
      stopId
    }
  }
};

const stopServiceStub = {
  searchById: jasmine.createSpy('searchById').and.returnValue(of([]))
};

describe('StopPageComponent', () => {
  let component: StopPageComponent;
  let fixture: ComponentFixture<StopPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [StopPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        {
          provide: StopsService,
          useValue: stopServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    let stopsService: StopsService;

    beforeEach(() => {
      stopsService = TestBed.get(StopsService);
    });

    it('should pass to searchById() correct stopId', () => {
      expect(stopsService.searchById).toHaveBeenCalledWith(stopId);
    });
  });
});
