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

export const firstToUpperCase = (str) => {
  return str && str.charAt(0).toUpperCase() + str.slice(1);
};

export const checkValidAmount = (amount) => {
  if (amount === ".00") {
    return "Please enter an amount";
  }

  if (parseFloat(amount) < 1) {
    return "Amount must be more than $1.00";
  }

  if (parseFloat(amount) > 2000) {
    return "Maximum amount is $2000.00";
  }

  return "";
};
