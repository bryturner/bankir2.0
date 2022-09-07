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
