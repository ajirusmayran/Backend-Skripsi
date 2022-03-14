import { TimestampEntity } from "src/base/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('temp_tracking')
export class TempTracking extends TimestampEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("uuid")
    trackId: string

    @Column()
    currentGeo: string
}
