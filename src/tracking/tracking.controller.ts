import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { TrackingService } from "./tracking.service";
import { CreateTrackingDto } from "./dto/create-tracking.dto";
import { UpdateTrackingDto } from "./dto/update-tracking.dto";
import { ListenTempTrackingReqDto } from "./dto/listen-temp-tracking-req.dto";

@Controller("tracking")
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  /* 
    temp tracking API
  */
  @Get("temp")
  trackCurrLocation(@Query("trackId") id: string){
    console.log(id)
    return this.trackingService.getLatestTempTracking(id)
  }

  @Post()
  create(@Body() createTrackingDto: CreateTrackingDto) {
    return this.trackingService.createTracking(createTrackingDto);
  }

  @Post("listen")
  listenTempTracking(@Body() listenTempTrackingDto: ListenTempTrackingReqDto) {
    return this.trackingService.listenTempTracking(listenTempTrackingDto);
  }

  @Get()
  findAll() {
    return this.trackingService.findAllTracking();
  }

  @Get("active")
  findTrackingActive(@Query("userId") userId?: string) {
    return this.trackingService.findTrackingActive(userId);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTrackingDto: UpdateTrackingDto
  ) {
    return this.trackingService.update(+id, updateTrackingDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.trackingService.remove(+id);
  }

}
