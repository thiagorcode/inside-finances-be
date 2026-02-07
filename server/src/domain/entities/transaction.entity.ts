import { AggregateRoot } from '../common/aggregate-root';
import { UniqueEntityID } from '../common/unique-entity-id';
import { InstallmentsGeneratedEvent } from '../events/transaction/installlments-generated.event';

export enum TYPE_TRANSACTION {
  RECIPE = 'RECIPE',
  EXPENSE = 'EXPENSE',
}
export enum TYPE_EXPENSE {
  ESSENTIAL = 'ESSENTIAL',
  NOT_ESSENTIAL = 'NOT_ESSENTIAL',
  LOSE = 'LOSE',
}

export interface TransactionProps {
  value: number;
  type: TYPE_TRANSACTION;
  category: string;
  card?: string;
  description: string;
  date: Date;
  isPaid: boolean;
  expenseType: TYPE_EXPENSE;
  originCreate: string;
  isInstallment: boolean;
  currentInstallment: number;
  finalInstallment: number;
  monthYear: string;
  year: string;
}
//
//* Criar entidade TransactionCard para passar dentro do parametro
//* TransactionCard
//* {
//* id: UniqueEntityID
//* name: string
//* }
//*/

export class Transaction extends AggregateRoot<TransactionProps> {
  get type() {
    return this.props.type;
  }
  get date() {
    return this.props.date;
  }
  get isPaid() {
    return this.props.isPaid;
  }
  get expenseType() {
    return this.props.expenseType;
  }
  get originCreate() {
    return this.props.originCreate;
  }
  get isInstallment() {
    return this.props.isInstallment;
  }
  get finalInstallment() {
    return this.props.finalInstallment;
  }
  get monthYear() {
    return this.props.monthYear;
  }
  get year() {
    return this.props.year;
  }
  get currentInstallment() {
    return this.props.currentInstallment;
  }
  get description() {
    return this.props.description;
  }
  get value() {
    return this.props.value;
  }
  get category() {
    return this.props.category;
  }
  get card() {
    return this.props.card;
  }

  static create(props: TransactionProps, id?: UniqueEntityID) {
    const transaction = new Transaction(props, id);

    return transaction;
  }

  generateInstallments(finalInstallment: number) {
    if (
      !this.props.isInstallment ||
      finalInstallment <= this.props.currentInstallment
    ) {
      throw new Error('Invalid installments');
    }
    this.props.finalInstallment = finalInstallment;
    this.addDomainEvent(
      new InstallmentsGeneratedEvent(this.id, {
        value: this.props.value,
        date: this.props.date,
        finalInstallment,
        currentInstallment: this.props.currentInstallment,
        category: this.props.category,
        card: this.props.card,
        description: this.props.description,
        type: this.props.type,
        expenseType: this.props.expenseType,
      }),
    );
  }
}
// TODO: Iniciar sem aplicar totalmente o DDD, mas ir aprofundado aos poucos
