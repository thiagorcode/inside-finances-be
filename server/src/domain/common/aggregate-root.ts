import { DomainEvent } from './domain-event';
import { Entity } from './entity';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }
  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }
  public clearDomainEvents(): void {
    this._domainEvents = [];
  }
}
