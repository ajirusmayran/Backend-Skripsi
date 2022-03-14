import { Injectable } from '@nestjs/common';
import e from 'express';
import { FindCondition, FindConditions, FindOneOptions, IsNull } from 'typeorm';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { ListenTempTrackingDto } from './dto/listen-temp-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { Tracking } from './entities/tracking.entity';
import { TempTrackingRepository } from './repository/temp-tracking.repository';
import { TrackingRepository } from './repository/tracking.repository';

@Injectable()
export class TrackingService {
  constructor(
    private trackingRepo : TrackingRepository,
    private tempTrackRepo: TempTrackingRepository
  ){}
  async createTracking(createTrackingDto: CreateTrackingDto) : Promise<Tracking>{
    const entity = this.trackingRepo.create(createTrackingDto)
    return await this.trackingRepo.save(entity)
  }

  async findAllTracking() :Promise<Tracking[]>{
    return await this.trackingRepo.find()
  }

  listenTempTracking(dto: ListenTempTrackingDto): boolean {
    const entity = this.tempTrackRepo.create(dto)
    this.tempTrackRepo.save(entity)
    return true
  }

  async findTrackingActive(user?: string): Promise<Tracking[]> {
    let criteria = {
      finishTm:null, 
      actuallyFinishGeo:null,
      userId: undefined
    }
    user ? criteria = {...criteria, userId:user} : delete criteria.userId

    return await this.trackingRepo.find({
      where:criteria,
      order:{createdTm:'DESC'},
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} tracking`;
  }

  update(id: number, updateTrackingDto: UpdateTrackingDto) {
    return `This action updates a #${id} tracking`;
  }

  remove(id: number) {
    return `This action removes a #${id} tracking`;
  }
}
