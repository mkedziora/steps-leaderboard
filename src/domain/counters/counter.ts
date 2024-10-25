import { EntityManager } from "typeorm";
import { User } from "../../db/entities/User";
import { Counter } from "../../db/entities/Counter";

export { createCounter };
const createCounter =
  ({ entityManager }: { entityManager: EntityManager }) =>
  async ({ value, userId }: { value: number; userId: string }) => {
    const user = await entityManager.findOne(User, { where: { id: userId } });

    if (!user) {
      throw new Error("Cannot create counter", { cause: "user not found" });
    }

    return entityManager.save(Counter, {
      value,
      user,
    });
  };
