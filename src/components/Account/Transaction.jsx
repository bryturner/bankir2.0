import styled from "styled-components";
import { replaceComma } from "../../constants/helpers";

const Container = styled.li`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  padding: 1rem;
  border-bottom: 0.75px solid ${({ theme }) => theme.color.primaryLight};

  /* &:nth-child(even) {
    background-color: ${({ theme }) => theme.color.primaryLightest};
  } */
`;

const TransDate = styled.p`
  font-size: 1.5rem;
  align-self: center;
`;

const Desc = styled.p`
  text-align: center;
  font-size: 1.6rem;
`;

const Amount = styled.p`
  text-align: right;
  font-size: 1.6rem;
  color: ${(props) => (props.type === "negative" ? "#ff0000" : "#376805")};
`;

function Transaction({ transDate, description, amount }) {
  const dt = new Date(transDate).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <Container>
      <TransDate>{dt}</TransDate>
      <Desc>{description}</Desc>
      {amount < 0 ? (
        <Amount type="negative">
          -${replaceComma(amount?.toFixed(2).slice(1))}
        </Amount>
      ) : (
        <Amount type="positive">${replaceComma(amount?.toFixed(2))}</Amount>
      )}
    </Container>
  );
}

export default Transaction;
