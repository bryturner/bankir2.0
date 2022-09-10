import Total from "./Total";

function TotalAPY({ text, value }) {
  return <Total text={text}>{value.toFixed(1)}%</Total>;
}

export default TotalAPY;
