import { Serializable, deserialize, serialize } from "typescript-json-serializer";

@Serializable()
export default class Entity {
  static deserialize<T extends Entity>(entityDao: Record<string, unknown>): T {
    return deserialize(entityDao, this) as T;
  }

  serialize(): Record<string, unknown> {
    return serialize(this);
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
