import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class TimestampEntity {
  @CreateDateColumn()
  createdTm: Date;
  @UpdateDateColumn()
  modifiedTm: Date;
}
