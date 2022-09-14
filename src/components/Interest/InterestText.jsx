import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const AccountText = styled.span`
  font-weight: 500;
`;

function InterestText({ modalData }) {
  const { years, standardEarned, premiumEarned, compounded } = modalData;
  return (
    <Container>
      <span>
        In a {years} year period compounded{" "}
        {compounded === "12"
          ? "monthly"
          : compounded === "4"
          ? "quarterly"
          : "yearly"}{" "}
        you will earn:
      </span>
      <AccountText>Standard: ${standardEarned}</AccountText>
      <AccountText>Premium: ${premiumEarned}</AccountText>
      <span>Add interest earned to your accounts?</span>
    </Container>
  );
}

export default InterestText;
