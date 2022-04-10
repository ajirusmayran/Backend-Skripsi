export class CreateTrackingDto {
  userId: string;
  startGeo: string;
  finishGeo: string;
  actuallyFinishGeo?: string;
  originAddress?: string;
  destinationAddress?: string;
}
