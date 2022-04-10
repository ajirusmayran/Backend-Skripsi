import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TimestampEntity } from "src/base/timestamp.entity";
import * as bcrypt from "bcrypt";
import { Tracking } from "src/tracking/entities/tracking.entity";
import { type } from "os";

@Entity("user")
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  phone: string;

  @Column({default:true})
  username: string;

  @BeforeInsert()
  async hashPassword() {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(this.password, saltOrRounds);
    this.password = hash;
  }
  @Column()
  password: string;

  @Column()
  type: string;

  @OneToMany((type) => Tracking, (tracking) => tracking.user)
  tracking: Tracking;

  @Column({default:true})
  status: boolean
}
