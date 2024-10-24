import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Counter {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: number;

  @ManyToOne(() => User, (user) => user.counters)
  user: User;
}
