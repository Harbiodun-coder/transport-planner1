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
    duration: number;
    departureTime: string;
    instruction: {
      summary: string;
    };
  }[];
}
