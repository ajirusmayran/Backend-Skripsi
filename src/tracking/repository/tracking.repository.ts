import { EntityRepository, Repository } from "typeorm";
import { Tracking } from "../entities/tracking.entity";

@EntityRepository(Tracking)
export class TrackingRepository extends Repository<Tracking>{}