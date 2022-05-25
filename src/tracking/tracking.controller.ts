import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	HttpCode,
} from "@nestjs/common"
import { TrackingService } from "./tracking.service"
import { CreateTrackingDto } from "./dto/create-tracking.dto"
import { UpdateTrackingDto } from "./dto/update-tracking.dto"
import { ListenTempTrackingReqDto } from "./dto/listen-temp-tracking-req.dto"
import FinishTrackingReqDto from "./dto/finish-tracking-req.dto"

@Controller("tracking")
export class TrackingController {
	constructor(private readonly trackingService: TrackingService) {}

	/* 
    temp tracking API
  */
	@Get("temp")
	trackCurrLocation(@Query("trackId") id: string) {
		return this.trackingService.getLatestTempTracking(id)
	}

	@Get("temp/all")
	getAllTempTracking(@Query("trackId") id: string) {
		return this.trackingService.getAllTempTracking(id)
	}

	@Post()
	@HttpCode(200)
	create(@Body() createTrackingDto: CreateTrackingDto) {
		return this.trackingService.createTracking(createTrackingDto)
	}

	@Post("listen")
	@HttpCode(200)
	listenTempTracking(@Body() listenTempTrackingDto: ListenTempTrackingReqDto) {
		return this.trackingService.listenTempTracking(listenTempTrackingDto)
	}

	@Post("finish")
	@HttpCode(200)
	finishTracking(@Body() request: FinishTrackingReqDto) {
		this.trackingService.finishTracking(request)
		return "OK"
	}

	@Get()
	findAll() {
		return this.trackingService.findAllTracking()
	}

	@Get("active")
	findTrackingActive(@Query("userId") userId?: string) {
		return this.trackingService.findTrackingActive(userId)
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateTrackingDto: UpdateTrackingDto
	) {
		return this.trackingService.update(+id, updateTrackingDto)
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.trackingService.remove(+id)
	}
}
