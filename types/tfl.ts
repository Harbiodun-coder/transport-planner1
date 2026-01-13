export interface StopPoint {
  id: string;
  name: string;
}

export interface Journey {
  startDateTime: string;
  arrivalDateTime: string;
  duration: number;
  fare?: {
    totalCost: number;
  };
  legs: {
    mode: any;
    arrivalPoint: any;
    departurePoint: any;
    duration: number;
    departureTime: string;
    instruction: {
      summary: string;
    };
  }[];
}
