import { forwardRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 100%;
  &:focus {
    border-color: ${(props) =>
      props.descIsValid
        ? props.theme.color.secondary
        : props.theme.color.error};

    box-shadow: ${(props) =>
      props.descIsValid
        ? props.theme.boxShadow.focus
        : props.theme.boxShadow.error};
  }
`;

const DescriptionInput = forwardRef(
  ({ formName, id, value, onChange, placeholder, descIsValid }, ref) => {
    return (
      <Container>
        <Label htmlFor={id}>Description:</Label>
        <div>
          <Input
            descIsValid={descIsValid}
            type="text"
            name={formName}
            id={id}
            maxLength={35}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            ref={ref}
          />
        </div>
      </Container>
    );
  }
);

export default DescriptionInput;
