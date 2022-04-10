import { TimestampEntity } from "src/base/timestamp.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TempTracking } from "./temp-tracking.entity";

@Entity("tracking")
export class Tracking extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  startGeo: string;

  @Column()
  finishGeo: string;

  @Column({ default: null })
  actuallyFinishGeo: string;

  @Column({ type: "text" })
  originAddress: string;

  @Column({ type: "text" })
  destinationAddress: string;

  @Column({ type: "datetime", default: null })
  finishTm: Date;

  @ManyToOne((type) => User, (user) => user.tracking)
  user: User;

  @OneToMany((type) => TempTracking, (temp) => temp.trackId)
  tempTracking: TempTracking[];
}
