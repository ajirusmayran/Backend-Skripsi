import { EntityRepository, Repository } from "typeorm";
import { TempTracking } from "../entities/temp-tracking.entity";

@EntityRepository(TempTracking)
export class TempTrackingRepository extends Repository<TempTracking> {}
