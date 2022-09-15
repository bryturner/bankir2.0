export const createModalAmount = (amount) => {
  const amntComma = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (!amntComma.includes(".")) {
    return amntComma + ".00";
  } else if (amntComma.indexOf(".") === amntComma.length - 1) {
    return amntComma + "00";
  } else if (amntComma.indexOf(".") === amntComma.length - 2) {
    return amntComma + "0";
  } else {
    return amntComma;
  }
};

export const firstToUpperCase = (str) => {
  return str && str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatAmount = (amount) => {
  return amount
    .replace(/^0+/, "") // removes starting 0
    .replace(/(?!\.)\D/g, "") // removes letters
    .replace(/(?<=\..*)\./g, "") // replaces '.' if more than one
    .replace(/(?<=\.\d{2}).*/g, ""); // limits to 2 places after decimal
};

export const replaceComma = (amount) => {
  return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatTransfer = (transfer) => {
  if (transfer !== "premium" && transfer !== "standard") {
    return transfer;
  }
  return `${firstToUpperCase(transfer)} Savings`;
};
