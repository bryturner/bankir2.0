import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import InterestInput from "./InterestInput";
import InterestFormButton from "./InterestFormButton";
import DetailsBox from "../DetailsBox/DetailsBox";
import InterestModal from "./InterestModal";
import Option from "../SelectOption/Option";
import SelectOption from "../SelectOption/SelectOption";
import StyledFormInputs from "../StyledComponents/StyledFormInputs";
import { BASE_URL } from "../../constants/paths";

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  > div {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;

  > input {
    color: inherit;
    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 2.8rem;

  > button {
    width: 100%;
  }
`;

const TotalsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2.4rem;
`;

const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Account = styled.p``;

const Total = styled.p`
  font-size: 1.8rem;
  text-align: center;
`;

const calculateEarnings = (years, compounded, balance, apy) => {
  const p = balance;
  const t = years;
  const n = parseInt(compounded);
  const r = parseFloat(apy / 100);

  const total = p * Math.pow(1 + r / n, n * t);
  const interest = total - p;
  return interest.toFixed(2);
};

const replaceComma = (amount) => {
  return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function InterestForm({
  fetchAccountData,
  standardBalance,
  standardAPY,
  premiumBalance,
  premiumAPY,
}) {
  const [years, setYears] = useState(1);
  const [compounded, setCompounded] = useState("12");
  const [standardEarned, setStandardEarned] = useState("0");
  const [premiumEarned, setPremiumEarned] = useState("0");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ years, compounded });

  const reset = () => {
    setYears(1);
    setCompounded("12");
    setModalData({ years, compounded });
  };

  const calculateInterest = useCallback(() => {
    const calculatedStandard = calculateEarnings(
      years,
      compounded,
      standardBalance,
      standardAPY
    );

    const calculatedPremium = calculateEarnings(
      years,
      compounded,
      premiumBalance,
      premiumAPY
    );

    setStandardEarned(calculatedStandard);
    setPremiumEarned(calculatedPremium);
  }, [
    years,
    compounded,
    standardBalance,
    standardAPY,
    premiumBalance,
    premiumAPY,
  ]);

  const handleInitSubmit = () => {
    const modData = {
      years,
      compounded,
      standardEarned: replaceComma(standardEarned),
      premiumEarned: replaceComma(premiumEarned),
    };

    setModalData(modData);
    setShowModal(true);
  };

  const submitInterest = async (e) => {
    e.preventDefault();

    try {
      const data = {
        standardEarned,
        premiumEarned,
      };

      await axios.put(`${BASE_URL}account/interest`, data);

      reset();
      fetchAccountData();
    } catch (err) {
      console.error(err);
    } finally {
      setShowModal(false);
    }
  };

  useEffect(() => {
    calculateInterest();
  }, [calculateInterest]);
  return (
    <form onSubmit={submitInterest} id="interestForm">
      <InterestModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalData={modalData}
      />

      <DetailsBox header="Earn Interest">
        <StyledFormInputs>
          <Container>
            <p>Over what period will you earn interest?</p>
            <Wrapper>
              <InterestInput
                formName="interestForm"
                id="interestInput"
                value={years}
                onChange={(e) => {
                  setYears(e.target.value);
                }}
              />
              <label htmlFor="interestInput">year period</label>
            </Wrapper>
          </Container>

          <Container>
            <p>How often will it be compounded?</p>
            <SelectOption
              formName="interestForm"
              id="compoundSelect"
              defaultValue={compounded}
              onChange={(e) => {
                setCompounded(e.target.value);
              }}
            >
              <Option value="12" title="Monthly" />
              <Option value="4" title="Quarterly" />
              <Option value="1" title="Yearly" />
            </SelectOption>
          </Container>
        </StyledFormInputs>

        <TotalsContainer>
          <TotalWrapper>
            <Account>Standard Savings</Account>
            <Total>${replaceComma(standardEarned)}</Total>
          </TotalWrapper>

          <TotalWrapper>
            <Account>Premium Savings</Account>
            <Total>${replaceComma(premiumEarned)}</Total>
          </TotalWrapper>
        </TotalsContainer>

        <ButtonWrapper>
          <InterestFormButton onClick={handleInitSubmit} />
        </ButtonWrapper>
      </DetailsBox>
    </form>
  );
}

export default InterestForm;
