import { DataSource } from "typeorm";
import { SeederFactoryManager } from "typeorm-extension";
import { faker } from "@faker-js/faker";
import { User } from "../entities/User";
import { Team } from "../entities/Team";

export default class MainSeeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ) {
    const userRepository = dataSource.getRepository(User);

    const userFactory = factoryManager.get(User);
    const teamFactory = factoryManager.get(Team);

    const teams = await teamFactory.saveMany(3);

    const users = await Promise.all(
      Array(15)
        .fill("")
        .map(async () => {
          const made = await userFactory.make({
            team: faker.helpers.arrayElement(teams),
          });

          return made;
        })
    );
    await userRepository.save(users);
  }
}
