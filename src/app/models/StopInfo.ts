import { StopSchedule } from './StopSchedule';

export class StopInfo {
  stopName: string;
  stopSchedules: StopSchedule[];

  constructor(stopName: string, stopSchedules: StopSchedule[]) {
    this.stopName = stopName;
    this.stopSchedules = stopSchedules;
  }
}

/**
 * This class can be shortened by using following notation - constructor(stopName: string, stopSchedules: StopSchedule[]) {} -
 * and removing the property declaration at the beginning. But I chose this one because of its readability
 */
