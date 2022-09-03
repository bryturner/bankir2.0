import styled from "styled-components";

const Option = styled.option`
  color: inherit;
`;

function AccountOption({ value, title }) {
  return <Option value={value}>{title}</Option>;
}

export default AccountOption;
