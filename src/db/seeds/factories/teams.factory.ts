import { setSeederFactory } from "typeorm-extension";
import { Team } from "../../entities/Team";

export { TeamsFactory };

const TeamsFactory = setSeederFactory(Team, (faker) => {
  const team = new Team();

  team.name = faker.company.name();

  return team;
});
