import styled from "styled-components";

const Form = styled.form``;

function TransferForm({ id, children, onSubmit }) {
  return (
    <Form onSubmit={onSubmit} id={id}>
      {children}
    </Form>
  );
}

export default TransferForm;
