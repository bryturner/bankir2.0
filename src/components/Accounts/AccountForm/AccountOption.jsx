import styled from "styled-components";

const Option = styled.option``;

function AccountOption({ value, title }) {
  return <Option value={value}>{title}</Option>;
}

export default AccountOption;
