import styled from "styled-components";
import { useState } from "react";

import InterestFormButton from "./InterestFormButton";
import DetailsBox from "../DetailsBox/DetailsBox";
import InterestInput from "./InterestInput";
import InterestModal from "./InterestModal";
import Option from "../SelectOption/Option";
import SelectOption from "../SelectOption/SelectOption";

const Container = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  /* > div {
    width: 50%;
  } */
`;

const Text = styled.p`
  font-size: 1.4rem;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  > input {
    font-size: 1.4rem;
    color: inherit;
  }
`;

const Label = styled.label`
  font-size: 1.4rem;
`;

const calculateEarnings = (years, compounded, balance, apy) => {
  const p = balance;
  const t = years;
  const n = compounded;
  const r = parseFloat(apy / 100);

  const total = p * Math.pow(1 + r / n, n * t);
  const interest = total - p;
  return interest.toFixed(2);
};

function InterestForm({
  fetchAccountData,
  standardBalance,
  standardAPY,
  premiumBalance,
  premiumAPY,
}) {
  const [years, setYears] = useState(1);
  const [compounded, setCompounded] = useState(12);
  const [standardEarned, setStandardEarned] = useState("");
  const [premiumEarned, setPremiumEarned] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const reset = () => {
    setYears(1);
    setCompounded(12);
  };

  const handleConfirmEarnings = () => {
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

    const modData = {
      standardEarned: standardEarned,
      premiumEarned: premiumEarned,
      years: years,
    };

    setModalData(modData);
    setShowModal(true);
    console.log(modalData);
  };

  const submitInterest = (e) => {
    e.preventDefault();

    const data = {
      standardEarned: standardEarned,
      premiumEarned: premiumEarned,
    };

    setShowModal(false);
    reset();
    console.log(data);
  };
  return (
    <form onSubmit={submitInterest} id="interestForm">
      <InterestModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalData={modalData}
        handleConfirmClick={submitInterest}
      />
      <DetailsBox header="Earn Interest">
        <Container>
          <Text>Over what period has your interest been earned?</Text>
          <Wrapper>
            <InterestInput
              formName="interestForm"
              id="interestInput"
              value={years}
              onChange={(e) => {
                setYears(e.target.value);
              }}
            />
            <Label htmlFor="interestInput">year period</Label>
          </Wrapper>
        </Container>
        <Container>
          <Text>How often was your interest compounded?</Text>
          <SelectOption
            formName="interestForm"
            id="compoundSelect"
            defaultValue={compounded}
            onChange={(e) => {
              setCompounded(e.target.value);
            }}
          >
            <Option value={12} title="Monthly" />
            <Option value={4} title="Quarterly" />
            <Option value={1} title="Yearly" />
          </SelectOption>
        </Container>
        <InterestFormButton onClick={handleConfirmEarnings} />
      </DetailsBox>
    </form>
  );
}

export default InterestForm;
