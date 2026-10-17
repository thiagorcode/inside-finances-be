import { AggregateRoot } from '../common/aggregate-root';
import { UniqueEntityID } from '../common/unique-entity-id';
import { InstallmentsGeneratedEvent } from '../events/transaction/installments-generated.event';

export enum TypeTransactionEnum {
  RECIPE = 'RECIPE',
  EXPENSE = 'EXPENSE',
}
export enum TypeExpenseEnum {
  ESSENTIAL = 'ESSENTIAL',
  NOT_ESSENTIAL = 'NOT_ESSENTIAL',
  LOSS = 'LOSS',
}

// Deriva os campos de período a partir da data (formato YYYY-MM, igual à entidade TypeORM)
const periodFrom = (date: Date) => ({
  year: date.getFullYear(),
  yearMonth: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
});

export interface TransactionProps {
  userId: string;
  value: number;
  type: TypeTransactionEnum;
  category: string;
  card?: string;
  description: string;
  date: Date;
  isPaid: boolean;
  expenseType: TypeExpenseEnum;
  originCreate: string;
  isInstallment: boolean;
  currentInstallment: number;
  finalInstallment: number;
  /** YYYY-MM — derivado de date em create()/update(), não enviar no payload */
  yearMonth?: string;
  /** derivado de date em create()/update(), não enviar no payload */
  year?: number;
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
  get userId() {
    return this.props.userId;
  }
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
  get yearMonth() {
    return this.props.yearMonth;
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
    const period = periodFrom(new Date(props.date));

    const transaction = new Transaction({ ...props, ...period }, id);

    return transaction;
  }

  // O id do usuário é imutável: não faz parte das atualizações permitidas
  update(changes: Omit<Partial<TransactionProps>, 'userId'>) {
    this.props = { ...this.props, ...changes };

    if (changes.date) {
      const period = periodFrom(new Date(changes.date));
      this.props.year = period.year;
      this.props.yearMonth = period.yearMonth;
    }
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
        userId: this.props.userId,
        value: this.props.value,
        date: this.props.date,
        finalInstallment,
        currentInstallment: this.props.currentInstallment,
        category: this.props.category,
        card: this.props.card,
        description: this.props.description,
        type: this.props.type,
        expenseType: this.props.expenseType,
        originCreate: this.props.originCreate,
      }),
    );
  }

  // Expõe apenas o estado público — evita vazar props/domainEvents na serialização
  toJSON() {
    return {
      id: this.id.toString(),
      userId: this.props.userId,
      value: this.props.value,
      type: this.props.type,
      category: this.props.category,
      card: this.props.card,
      description: this.props.description,
      date: this.props.date,
      isPaid: this.props.isPaid,
      expenseType: this.props.expenseType,
      originCreate: this.props.originCreate,
      isInstallment: this.props.isInstallment,
      currentInstallment: this.props.currentInstallment,
      finalInstallment: this.props.finalInstallment,
      yearMonth: this.props.yearMonth,
      year: this.props.year,
    };
  }
}
// TODO: Iniciar sem aplicar totalmente o DDD, mas ir aprofundado aos poucos
