import { setSeederFactory } from "typeorm-extension";
import { Counter } from "../../entities/Counter";

export { CountersFactory };

const CountersFactory = setSeederFactory(Counter, (faker) => {
  const counter = new Counter();

  counter.value = faker.number.int();

  return counter;
});
