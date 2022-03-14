import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { TimestampEntity } from "src/base/timestamp.entity"
import * as bcrypt from 'bcrypt'

@Entity('user')
export class User extends TimestampEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    gender: string

    @Column()
    phone: string

    @Column()
    username: string

    @BeforeInsert()
    async hashPassword() {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(this.password, saltOrRounds);
        this.password = hash
    }
    @Column()
    password: string

    @Column()
    type: string

}