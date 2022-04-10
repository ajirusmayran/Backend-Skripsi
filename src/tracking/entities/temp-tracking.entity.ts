import { TimestampEntity } from "src/base/timestamp.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tracking } from "./tracking.entity";

@Entity("temp_tracking")
export class TempTracking extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @ManyToOne((type) => Tracking, (tracking) => tracking.id)
  @Column("uuid")
  trackId: string;

  @Column()
  currentGeo: string;

  


}
