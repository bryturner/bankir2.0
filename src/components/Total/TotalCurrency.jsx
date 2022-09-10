import Total from "./Total";

function TotalCurrency({ text, amount }) {
  const formattedAmount = amount
    ?.toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return <Total text={text}>${formattedAmount}</Total>;
}

export default TotalCurrency;
