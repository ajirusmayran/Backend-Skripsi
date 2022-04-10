import GeoLiteralDto from "./geo-literal.dto";

export default interface CurrentTempTrackingRespDto {
    trackId: string
    id: string
    currentGeo: GeoLiteralDto
    createdTm: Date
}