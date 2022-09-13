import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 1.4rem;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 100%;
  border-color: ${(props) =>
    props.descIsValid ? props.theme.color.lightGray : props.theme.color.error};

  box-shadow: ${(props) =>
    props.descIsValid ? "none" : props.theme.boxShadow.error};
`;

function DescriptionInput({
  formName,
  id,
  value,
  onChange,
  placeholder,
  descIsValid,
}) {
  return (
    <Container>
      <Title>Description:</Title>
      <Label htmlFor={id}>
        <Input
          descIsValid={descIsValid}
          type="text"
          name={formName}
          id={id}
          maxLength={35}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </Label>
    </Container>
  );
}

export default DescriptionInput;
