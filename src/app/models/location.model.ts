export interface Location {
    id: number;
    name: string;
    location: number[];
    type: LocationType;
    image: {
      name: string;
      base64: string;
    }
}

export type LocationType = 'store' | 'company' | 'street';
