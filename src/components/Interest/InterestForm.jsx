import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

import InterestInput from "./InterestInput";
import InterestFormButton from "./InterestFormButton";
import DetailsBox from "../DetailsBox/DetailsBox";
import InterestModal from "./InterestModal";
import Option from "../SelectOption/Option";
import SelectOption from "../SelectOption/SelectOption";
import StyledFormInputs from "../StyledComponents/StyledFormInputs";

const Container = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const Text = styled.p``;

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  > input {
    color: inherit;
  }
`;

const Label = styled.label``;

const ButtonWrapper = styled.div`
  margin-top: 2.8rem;

  > button {
    width: 100%;
  }
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
  const [modalData, setModalData] = useState({ years, compounded });

  const reset = () => {
    setYears(1);
    setCompounded(12);
    setModalData({ years, compounded });
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
      years,
      compounded,
      standardEarned,
      premiumEarned,
    };

    setModalData(modData);
    setShowModal(true);
    //  console.log(modalData);
  };

  const submitInterest = async (e) => {
    e.preventDefault();

    try {
      const data = {
        standardEarned,
        premiumEarned,
      };

      await axios.put("http://localhost:5002/account/interest", data);

      reset();
      fetchAccountData();
      // console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setShowModal(false);
    }
  };
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
            <p>Over what period has your interest been earned?</p>
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
            <p>How often was your interest compounded?</p>
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
        </StyledFormInputs>

        <ButtonWrapper>
          <InterestFormButton onClick={handleConfirmEarnings} />
        </ButtonWrapper>
      </DetailsBox>
    </form>
  );
}

export default InterestForm;
