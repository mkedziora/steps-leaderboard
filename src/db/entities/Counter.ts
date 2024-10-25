import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Counter {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { nullable: true })
  value: number;

  @ManyToOne(() => User, (user) => user.counters)
  user: Relation<User>;
}
