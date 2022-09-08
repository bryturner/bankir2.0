import styled from "styled-components";

const Form = styled.form``;

function TransferForm({ id, children, onSubmit, ref }) {
  return (
    <Form onSubmit={onSubmit} id={id} ref={ref}>
      {children}
    </Form>
  );
}

export default TransferForm;
