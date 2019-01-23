export interface SearchStopResponse {
  time: number;
  stops: Stop[];
  uri: string;
  name: string;
}

export interface Stop {
  name: string;
  agency: string;
  routes: Route[];
  uri: string;
}

export interface Route {
  name: string;
  stop_times: StopTime[];
  uri: string;
  route_group_id: string;
}

export interface StopTime {
  service_id: number;
  shape: string;
  departure_timestamp: number;
  departure_time: string;
}
