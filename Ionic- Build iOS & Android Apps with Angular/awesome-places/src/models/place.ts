import { Location } from './location';

export class Place {
  constructor(
    public title: string,
    public description: string,
    public imageUrl: string,
    public location: Location) {}
}
