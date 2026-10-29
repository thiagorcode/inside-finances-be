import { UniqueEntityID } from './unique-entity-id';

export abstract class Entity<Props> {
  private readonly _id: UniqueEntityID;
  protected props: Props;

  get id() {
    return this._id;
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
  }

  // Igualdade por identidade: mesma instância ou mesmo valor de id
  public equals(entity?: Entity<unknown>) {
    if (!entity) {
      return false;
    }

    if (entity === this) {
      return true;
    }

    return entity.id.equals(this._id);
  }
}
