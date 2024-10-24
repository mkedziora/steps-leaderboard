import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Counter } from "./Counter";
import { Team } from "./Team";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @ManyToOne(() => Team, (team) => team.users)
  team: Team;

  @OneToMany(() => Counter, (counter) => counter.user, { cascade: true })
  counters: Counter[];
}
