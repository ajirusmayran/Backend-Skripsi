import GeoLiteralDto from "./geo-literal.dto";

export interface TrackingDetailDto {
  id: string
  name?: string
  username?: string
  originAddress: string
  destinationAddress: string
  phone: string
  createdTm: Date
  status?: "active" | "done" | "pending"
  startGeo : GeoLiteralDto
  finishGeo: GeoLiteralDto

}
