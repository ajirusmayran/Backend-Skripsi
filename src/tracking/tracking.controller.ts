import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { ListenTempTrackingDto } from './dto/listen-temp-tracking.dto';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  create(@Body() createTrackingDto: CreateTrackingDto) {
    return this.trackingService.createTracking(createTrackingDto);
  }

  @Post('listen')
  listenTempTracking(@Body() listenTempTrackingDto: ListenTempTrackingDto){
    return this.trackingService.listenTempTracking(listenTempTrackingDto)
  }

  @Get()
  findAll() {
    return this.trackingService.findAllTracking();
  }

  @Get('active')
  findTrackingActive(@Query('userId') userId?:string){
    return this.trackingService.findTrackingActive(userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackingDto: UpdateTrackingDto) {
    return this.trackingService.update(+id, updateTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingService.remove(+id);
  }
}
