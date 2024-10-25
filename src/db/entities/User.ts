import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Counter } from "./Counter";
import { Team } from "./Team";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('varchar')
  email: string;

  @ManyToOne(() => Team, (team) => team.users)
  team: Relation<Team>;

  @OneToMany(() => Counter, (counter) => counter.user, { cascade: true })
  counters: Relation<Counter>[];
}
