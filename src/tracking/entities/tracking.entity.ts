import { TimestampEntity } from "src/base/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tracking')
export class Tracking extends TimestampEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    userId: string

    @Column()
    startGeo: string
    
    @Column()
    finishGeo: string
    
    @Column({default:null})
    actuallyFinishGeo: string

    @Column({type:'text'})
    address: string

    @Column({type:'datetime', default:null})
    finishTm: Date
}
