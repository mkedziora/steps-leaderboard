import { setSeederFactory } from "typeorm-extension";
import { User } from "../../entities/User";

export { UsersFactory };

const UsersFactory = setSeederFactory(User, (faker) => {
  const user = new User();

  user.email = `${faker.person.firstName()}@example.dev`;

  return user;
});
