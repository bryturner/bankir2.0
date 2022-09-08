export const appendAmount = (amount) => {
  if (!amount.includes(".")) {
    return amount + ".00";
  } else if (amount.indexOf(".") === amount.length - 1) {
    return amount + "00";
  } else if (amount.indexOf(".") === amount.length - 2) {
    return amount + "0";
  } else {
    return amount;
  }
};

class Message {
  #types = ["deposit", "withdrawal", "transfer", "delete", "error", "welcome"];
  constructor(data) {
    const { type, amount, account, transferTo, transferFrom } = data;
    this.type = type;
    this.amount = amount;
    this.account = account;
    this.transferTo = transferTo;
    this.transferFrom = transferFrom;

    this.#checkType();
  }

  #firstToUpperCase(str) {
    return str && str.charAt(0).toUpperCase() + str.slice(1);
  }

  #checkType() {
    if (!this.#types.includes(this.type)) {
      throw new Error(`type ${this.type} does not exist`);
    }
  }

  get transfer() {
    return `Transfer $${this.amount} from ${this.transferFrom} to ${this.transferTo}`;
  }

  get withdrawal() {
    return `Withdraw $${this.amount} from ${this.#firstToUpperCase(
      this.account
    )} Savings`;
  }

  get deposit() {
    return `Deposit $${this.amount} to ${this.#firstToUpperCase(
      this.account
    )} Savings`;
  }
}

export class ModalMessage extends Message {
  constructor(data) {
    super(data);
  }
  get deleteAccount() {
    return "Are you sure you want to delete your account";
  }

  get error() {
    return "No data has been received";
  }
}

export class AccountMessage extends Message {
  constructor(data, firstName) {
    super(data);
    this.firstName = firstName;
  }
  get welcome() {
    return `Congrats ${this.firstName}, you have opened a new account!`;
  }
}
