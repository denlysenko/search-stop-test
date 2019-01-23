export class StopSchedule {
  lineName: string;
  departureTime: string;

  constructor(lineName: string, departureTime: string) {
    this.lineName = lineName;
    this.departureTime = departureTime;
  }
}
