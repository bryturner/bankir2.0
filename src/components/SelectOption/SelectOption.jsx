import styled from "styled-components";

const Container = styled.div``;

const Label = styled.label`
  font-size: 1.4rem;
`;

const Select = styled.select`
  padding: 0.6rem 0;
  border-radius: 3px;
  width: 100%;
`;

function SelectOption({
  formName,
  id,
  labelText,
  defaultValue,
  onChange,
  children,
}) {
  return (
    <Container>
      <Label htmlFor={id}>{labelText}</Label>
      <Select
        name={formName}
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {children}
      </Select>
    </Container>
  );
}

export default SelectOption;
