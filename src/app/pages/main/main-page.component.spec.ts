import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MainPageComponent } from './main-page.component';

const routerStub = {
  navigate: jasmine.createSpy('navigate')
};

describe('MainComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: Router,
          useValue: routerStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    let router: Router;

    beforeEach(() => {
      routerStub.navigate.calls.reset();
      router = TestBed.get(Router);
    });

    it('should navigate if stopId is truthy', () => {
      const STOP_ID = 'stopId';
      component.onSubmit(STOP_ID);
      expect(router.navigate).toHaveBeenCalledWith(['/stop', STOP_ID]);
    });

    it('should not navigate if stopId is falsy', () => {
      const STOP_ID = '';
      component.onSubmit(STOP_ID);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
