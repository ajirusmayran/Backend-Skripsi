import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingRepository } from './repository/tracking.repository';
import { TempTrackingRepository } from './repository/temp-tracking.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([TrackingRepository, TempTrackingRepository])
  ],
  controllers: [TrackingController],
  providers: [TrackingService]
})
export class TrackingModule {}
