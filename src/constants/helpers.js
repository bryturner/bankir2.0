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

export const formatDate = (year) => {
  const dtToday = new Date();
  const dateRange = dtToday.setFullYear(dtToday.getFullYear() + year);
  return new Date(dateRange).toISOString().slice(0, 10);
};
