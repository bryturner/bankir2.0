import styled from "styled-components";
import Total from "./Total";

const Container = styled.div``;

function Totals() {
  return (
    <Container>
      <Total title="Account Total" amount="300" />
      <Total title="Interest Total" amount="50" />
    </Container>
  );
}

export default Totals;
