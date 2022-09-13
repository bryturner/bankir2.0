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
