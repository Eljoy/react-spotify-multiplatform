import { Serializable, serialize } from "typescript-json-serializer";

@Serializable()
export default class Entity {
  serialize(): Record<string, unknown> {
    return serialize(this);
  }

  toString(): string {
    return JSON.stringify(this.serialize());
  }
}
