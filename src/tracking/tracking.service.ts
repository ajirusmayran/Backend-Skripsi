import { BadRequestException, Injectable, Logger } from "@nestjs/common"
import e from "express"
import { FindCondition, FindConditions, FindOneOptions, IsNull } from "typeorm"
import { CreateTrackingDto } from "./dto/create-tracking.dto"
import CurrentTempTrackingRespDto from "./dto/current-temp-tracking-resp.dto"
import FinishTrackingReqDto from "./dto/finish-tracking-req.dto"
import GeoLiteralDto from "./dto/geo-literal.dto"
import { ListenTempTrackingReqDto } from "./dto/listen-temp-tracking-req.dto"
import { TrackingDetailDto } from "./dto/tracking-detail-resp.dto"
import { UpdateTrackingDto } from "./dto/update-tracking.dto"
import { Tracking } from "./entities/tracking.entity"
import { TempTrackingRepository } from "./repository/temp-tracking.repository"
import { TrackingRepository } from "./repository/tracking.repository"

@Injectable()
export class TrackingService {
	constructor(
		private trackingRepo: TrackingRepository,
		private tempTrackRepo: TempTrackingRepository
	) {}
	async createTracking(
		createTrackingDto: CreateTrackingDto
	): Promise<Tracking> {
		const entity = this.trackingRepo.create(createTrackingDto)
		return await this.trackingRepo.save(entity)
	}

	async findAllTracking(): Promise<TrackingDetailDto[]> {
		const tracks = await this.trackingRepo.find({ relations: ["user"] })
		const trackResp: TrackingDetailDto[] = tracks.map((track) => {
			const {
				id,
				originAddress,
				destinationAddress,
				createdTm,
				user,
				finishTm,
				finishGeo,
				startGeo,
				actuallyFinishGeo,
			} = track
			const { name, phone } = track?.user
			const status = !actuallyFinishGeo || !finishTm ? "active" : "done"

			return {
				id,
				name,
				originAddress,
				destinationAddress,
				createdTm,
				username: user.username,
				status: status,
				startGeo: this.buildGeo(startGeo),
				finishGeo: this.buildGeo(finishGeo),
				phone,
			}
		})
		return trackResp
	}

	listenTempTracking(dto: ListenTempTrackingReqDto): boolean {
		const entity = this.tempTrackRepo.create(dto)
		this.tempTrackRepo.save(entity)
		return true
	}

	async getLatestTempTracking(
		reqId: string
	): Promise<CurrentTempTrackingRespDto> {
		const track = await this.tempTrackRepo.findOne({
			where: {
				trackId: reqId,
			},
			order: { createdTm: "DESC" },
		})
		if (!track) {
			throw new BadRequestException("id not found")
		}
		const { createdTm, currentGeo, trackId, id } = track
		const geo = this.buildGeo(currentGeo)
		return {
			createdTm,
			id,
			trackId,
			currentGeo: geo,
		}
	}

	async getAllTempTracking(
		reqId: string
	): Promise<CurrentTempTrackingRespDto[]> {
		const tracks = await this.tempTrackRepo.find({
			where: {
				trackId: reqId,
			},
			order: { createdTm: "ASC" },
		})
		return tracks.map((track) => {
			const { createdTm, currentGeo, trackId, id } = track
			const geo = this.buildGeo(currentGeo)
			return {
				createdTm,
				id,
				trackId,
				currentGeo: geo,
			}
		})
	}

	async findTrackingActive(user?: string): Promise<Tracking[]> {
		let criteria = {
			finishTm: null,
			actuallyFinishGeo: null,
			userId: undefined,
		}
		user ? (criteria = { ...criteria, userId: user }) : delete criteria.userId

		return await this.trackingRepo.find({
			where: criteria,
			order: { createdTm: "DESC" },
		})
	}

	async finishTracking(finishTrackingReq: FinishTrackingReqDto): Promise<void> {
		const { lat, lng, trackId } = finishTrackingReq
		const track = await this.trackingRepo.findOne({
			where: {
				id: trackId,
			},
		})

		if (track) {
			track.actuallyFinishGeo = `${lat}, ${lng}`
			track.finishTm = new Date()
			await this.trackingRepo.save(track)
		}
		return
	}

	update(id: number, updateTrackingDto: UpdateTrackingDto) {
		return `This action updates a #${id} tracking`
	}

	remove(id: number) {
		return `This action removes a #${id} tracking`
	}

	buildGeo(geo: string): GeoLiteralDto {
		const str = geo.replace(" ", "")
		const split = str.split(",")
		return {
			lat: parseFloat(split[0]),
			lng: parseFloat(split[1]),
		}
	}
}
